import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { Asset } from '../../../../interfaces/asset.interface';
import { AssetState } from '../../../../models/asset/store/asset.state';
import { AssetDetailsComponent } from '../../dialogs/asset-details/asset-details.component';


@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit, OnDestroy {

  public assets!: Asset[];
  public columns: string[] = ['id', 'title', 'desc', 'unit', 'permission', 'type', 'created', 'updated', 'link', 'device'];

  private destroy$ = new Subject<void>();


  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly dialog: MatDialog) {
  }


  public ngOnInit(): void {
    this.store.select(AssetState.selectAll).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(assets => this.assets = assets);
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onAdd(): void {
    this.dialog.open(AssetDetailsComponent);
  }


  public onEdit(asset: Asset): void {
    this.dialog.open(AssetDetailsComponent, { data: asset });
  }
}
