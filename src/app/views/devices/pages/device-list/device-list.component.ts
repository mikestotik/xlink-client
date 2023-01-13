import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Device } from '../../../../interfaces/device.interface';
import { DeviceState } from '../../../../models/device/store/device.state';
import { DeviceDetailsComponent } from '../../dialogs/device-details/device-details.component';


@Component({
  templateUrl: './device-list.component.html',
  styleUrls: [ './device-list.component.scss' ]
})
export class DeviceListComponent implements OnInit, OnDestroy {

  @Select(DeviceState.selectAll)
  public devices$!: Observable<Device[]>;
  public selected!: Device;

  private destroy$ = new Subject<void>();


  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog) {
  }


  public ngOnInit(): void { }


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


  public onDevice(device: Device): void {
    this.selected = device;
  }
}
