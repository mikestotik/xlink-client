import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { WebsocketEndpoints } from './config/websocket.config';


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
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(event => {
      this.socket.emit(WebsocketEndpoints.TRACKER, event.urlAfterRedirects);
    });
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
