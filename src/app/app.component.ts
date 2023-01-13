import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Subject, takeUntil } from 'rxjs';
import { WebsocketEndpoints } from './config/websocket.config';
import { routerNavigationEnd } from './utils/router.utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();


  constructor(
    private socket: Socket,
    private router: Router) {
  }


  public ngOnInit(): void {
    routerNavigationEnd(this.router).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      navEnd => this.socket.emit(WebsocketEndpoints.TRACKER, navEnd.urlAfterRedirects)
    );
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
