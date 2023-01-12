import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { ApiConfig } from '../config/api.config';
import { AuthActions } from '../models/auth/store/auth.actions';
import { AuthState } from '../models/auth/store/auth.state';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<unknown>(null);


  constructor(
    private store: Store) {
  }


  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string | null = this.store.selectSnapshot(AuthState.accessToken);

    if (request.url === ApiConfig.AUTH_REFRESH) {
      token = this.store.selectSnapshot(AuthState.refreshToken);
    }

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((errorResponse) => {
        if (errorResponse instanceof HttpErrorResponse && errorResponse.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => errorResponse);
        }
      })
    );
  }


  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });
  }


  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.store.dispatch(new AuthActions.RefreshToken()).pipe(
        switchMap(() => {
          this.isRefreshing = false;
          const token = this.store.selectSnapshot(AuthState.accessToken);
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token as string));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addToken(request, token as string)))
      );
    }
  }
}
