import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppRoutes } from '../config/routes.config';
import { AuthActions } from '../models/auth/store/auth.actions';
import { AuthState } from '../models/auth/store/auth.state';
import { JwtUtils } from '../utils/jwt.utils';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router) {
  }


  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const assesToken = this.store.selectSnapshot(AuthState.accessToken);
    const refreshToken = this.store.selectSnapshot(AuthState.refreshToken);

    if (!refreshToken || JwtUtils.isExpired(refreshToken)) {
      this.router.navigateByUrl(AppRoutes.Auth);
      return false;
    }

    if (!assesToken || JwtUtils.isExpired(assesToken)) {
      this.store.dispatch(new AuthActions.RefreshToken());
    }
    return true;
  }

}
