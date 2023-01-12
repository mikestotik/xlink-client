import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { Asset } from '../../../interfaces/asset.interface';
import { AssetService } from '../services/asset.service';
import { AssetActions } from './asset.actions';


interface AssetModel {
  list: Asset[];
}


@State<AssetModel>({
  name: 'asset'
})
@Injectable()
export class AssetState {

  @Selector()
  public static selectAll(state: AssetModel): Asset[] {
    return state.list;
  }


  @Selector()
  public static selectOne(state: AssetModel): (id: number) => Asset {
    return (id: number): Asset => {
      const value = state.list.find(i => i.id === id);
      if (!value) {
        throw new Error('Asset not found');
      }
      return value;
    };
  }


  constructor(
    private readonly service: AssetService) {
  }


  @Action(AssetActions.GetAll)
  public getAll(ctx: StateContext<AssetModel>): Observable<Asset[]> {
    return this.service.getAll().pipe(
      tap(list => ctx.setState(
        patch({ list })
      ))
    );
  }


  @Action(AssetActions.GetOne)
  public getOne(ctx: StateContext<AssetModel>, { id }: AssetActions.GetOne): Observable<unknown> {
    return this.service.getOne(id).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Asset>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(AssetActions.Create)
  public create(ctx: StateContext<AssetModel>, { value }: AssetActions.Create): Observable<unknown> {
    return this.service.create(value).pipe(
      tap(value => ctx.setState(
        patch({ list: insertItem(value) })
      ))
    );
  }


  @Action(AssetActions.Update)
  public update(ctx: StateContext<AssetModel>, { id, value }: AssetActions.Update): Observable<unknown> {
    return this.service.update(id, value).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Asset>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(AssetActions.Delete)
  public remove(ctx: StateContext<AssetModel>, { id }: AssetActions.Delete): Observable<unknown> {
    return this.service.delete(id).pipe(
      tap(() => ctx.setState(patch({
        list: removeItem<Asset>(item => item?.id === id)
      })))
    );
  }
}
