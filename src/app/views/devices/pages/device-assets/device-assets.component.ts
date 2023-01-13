import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Asset } from '../../../../interfaces/asset.interface';
import { AssetState } from '../../../../models/asset/store/asset.state';
import { AssetDetailsComponent } from '../../dialogs/asset-details/asset-details.component';


@Component({
  templateUrl: './device-assets.component.html',
  styleUrls: [ './device-assets.component.scss' ]
})
export class DeviceAssetsComponent implements OnInit, OnDestroy {

  public assets!: Asset[];
  public columns: string[] = [ 'id', 'title', 'desc', 'unit', 'permission', 'type', 'created', 'updated', 'link' ];

  private deviceId!: number;
  private destroy$ = new Subject<void>();


  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly dialog: MatDialog) {
  }


  public ngOnInit(): void {
    this.route.url.pipe(
      map(() => this.route.snapshot.paramMap.get('id')),
      map(deviceId => Number(deviceId)),
      tap(deviceId => this.deviceId = deviceId),
      switchMap(deviceId => this.store.select(AssetState.selectByDevice).pipe(
        map(filterFn => filterFn(deviceId))
      )),
      takeUntil(this.destroy$)
    )
      .subscribe(assets => this.assets = assets);
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onAdd(): void {
    this.dialog.open(AssetDetailsComponent, {
      data: {
        device: this.deviceId
      }
    });
  }


  public onEdit(asset: Asset): void {
    this.dialog.open(AssetDetailsComponent, { data: asset });
  }
}
