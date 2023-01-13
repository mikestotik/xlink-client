import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Device } from '../../../../interfaces/device.interface';
import { DeviceState } from '../../../../models/device/store/device.state';
import { routerNavigationEnd } from '../../../../utils/router.utils';
import { DeviceDetailsComponent } from '../../dialogs/device-details/device-details.component';


@Component({
  templateUrl: './device-list.component.html',
  styleUrls: [ './device-list.component.scss' ]
})
export class DeviceListComponent implements OnInit, OnDestroy {

  @Select(DeviceState.selectAll)
  public devices$!: Observable<Device[]>;
  public selected!: boolean;

  private destroy$ = new Subject<void>();


  constructor(
    private readonly router: Router,
    private readonly routes: ActivatedRoute,
    private readonly store: Store,
    private readonly dialog: MatDialog) {
  }


  public ngOnInit(): void {
    this.selected = !!this.routes.children.length;

    routerNavigationEnd(this.router).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => this.selected = !!this.routes.children.length
    );
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onAdd(): void {
    this.dialog.open(DeviceDetailsComponent);
  }


  public onEdit(device: Device): void {
    this.dialog.open(DeviceDetailsComponent, { data: device });
  }
}
