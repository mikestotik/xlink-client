import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppRoutes } from '../../config/routes.config';
import { User } from '../../interfaces/account.interface';
import { AccountState } from '../../models/account/store/account.state';
import { AuthActions } from '../../models/auth/store/auth.actions';


interface IOSocket {
  connected: boolean;
}


@Component({
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit, OnDestroy {

  public appIcon = environment.app.icon;

  public user!: User;
  public websocket!: IOSocket;

  private readonly destroy$ = new Subject<void>();


  constructor(
    private router: Router,
    private store: Store,
    private socket: Socket,
    private snackBar: MatSnackBar) {
  }


  public ngOnInit(): void {
    this.websocket = this.socket.ioSocket;

    if (!this.websocket.connected) {
      this.snackBar.open('WebSocket connection not established', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 10000
      });
    }

    this.user = this.store.selectSnapshot(AccountState.user);
    // const devices = this.store.selectSnapshot(DeviceState.selectAll);

    // Device Subscriptions:
    // devices.forEach(device => {
    //   const topic = `${device.connector.topic.replace('<deviceID>', device.deviceId)}/system/info`;

    //   this.socket.fromEvent<DeviceInfo>(topic)
    //     .pipe(takeUntil(this.destroy$))
    //   // .subscribe(value => console.log(topic, value));
    // });

    // Asset Subscriptions:
    // const assets = this.store.selectSnapshot(AssetState.selectAll);

    // assets.forEach(asset => {
    //   const device = this.store.selectSnapshot(DeviceState.selectOne)(asset.device);
    //   const topic = `${device.connector.topic.replace('<deviceID>', device.deviceId)}/${asset.link}`;

    //   this.socket.fromEvent(topic)
    //     .pipe(takeUntil(this.destroy$))
    //   // .subscribe(value => console.log(topic, value));
    // })
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onExit(): void {
    this.store.dispatch(new AuthActions.Logout()).subscribe(
      () => this.router.navigate([ AppRoutes.Auth ])
    );
  }
}
