import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { Device } from '../../../../interfaces/device.interface';
import { DeviceState } from '../../../../models/device/store/device.state';
import { DeviceDetailsComponent } from '../../dialogs/device-details/device-details.component';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: [ './device-list.component.scss' ]
})
export class DeviceListComponent implements OnInit, OnDestroy {

  public devices!: Device[];
  public columns: string[] = [ 'id', 'title', 'desc', 'deviceId', 'created', 'updated', 'status' ];

  private destroy$ = new Subject<void>();


  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog) {
  }


  public ngOnInit(): void {
    this.store.select(DeviceState.selectAll).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(devices => this.devices = devices);
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onAddDevice(): void {
    this.dialog.open(DeviceDetailsComponent);
  }


  public onEditDevice(device: Device): void {
    this.dialog.open(DeviceDetailsComponent, { data: device });
  }
}
