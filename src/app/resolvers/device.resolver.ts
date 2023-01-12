import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AssetActions } from '../models/asset/store/asset.actions';
import { DeviceActions } from '../models/device/store/device.actions';
import { RecipeActions } from '../models/recipe/store/recipe.actions';


@Injectable({
  providedIn: 'root'
})
export class DeviceResolver implements Resolve<boolean> {

  constructor(
    private store: Store) {
  }


  public resolve(): Observable<boolean> {
    return this.store.dispatch([
      new DeviceActions.GetAll(),
      new AssetActions.GetAll(),
      new RecipeActions.GetAll(),
    ]);
  }
}
