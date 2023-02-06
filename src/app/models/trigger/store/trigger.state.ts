import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { Trigger } from '../../../interfaces/trigger.interface';
import { TriggerService } from '../services/trigger.service';
import { TriggerActions } from './trigger.actions';


interface TriggerModel {
  list: Trigger[];
}


@State<TriggerModel>({
  name: 'trigger'
})
@Injectable()
export class TriggerState {

  @Selector()
  public static selectAll(state: TriggerModel): Trigger[] {
    return state.list;
  }


  @Selector()
  public static selectOne(state: TriggerModel): (id: number) => Trigger {
    return (id: number): Trigger => {
      const value = state.list.find(i => i.id === id);
      if (!value) {
        throw new Error('Trigger not found');
      }
      return value;
    };
  }


  @Selector()
  public static selectByRule(state: TriggerModel): (ruleId: number) => Trigger[] {
    return (ruleId: number): Trigger[] => state.list.filter(i => i.rule === ruleId);
  }


  @Selector()
  public static selectJustCreated(state: TriggerModel): Trigger {
    return state.list[0];
  }


  constructor(
    private readonly service: TriggerService) {
  }


  @Action(TriggerActions.GetAll)
  public getAll(ctx: StateContext<TriggerModel>): Observable<Trigger[]> {
    return this.service.getAll().pipe(
      tap(list => ctx.setState(
        patch({ list })
      ))
    );
  }


  @Action(TriggerActions.GetOne)
  public getOne(ctx: StateContext<TriggerModel>, { id }: TriggerActions.GetOne): Observable<unknown> {
    return this.service.getOne(id).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Trigger>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(TriggerActions.Create)
  public create(ctx: StateContext<TriggerModel>, { value }: TriggerActions.Create): Observable<Trigger> {
    return this.service.create(value).pipe(
      tap(value => ctx.setState(
        patch({ list: insertItem(value) })
      ))
    );
  }


  @Action(TriggerActions.Update)
  public update(ctx: StateContext<TriggerModel>, { id, value }: TriggerActions.Update): Observable<Trigger> {
    return this.service.update(id, value).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Trigger>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(TriggerActions.Delete)
  public remove(ctx: StateContext<TriggerModel>, { id }: TriggerActions.Delete): Observable<void> {
    return this.service.delete(id).pipe(
      tap(() => ctx.setState(patch({
        list: removeItem<Trigger>(item => item?.id === id)
      })))
    );
  }


  @Action(TriggerActions.AddAsset)
  public addAsset(ctx: StateContext<TriggerModel>, { id, assetId }: TriggerActions.AddAsset): Observable<unknown> {
    return this.service.addAsset(id, assetId).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Trigger>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(TriggerActions.DeleteAsset)
  public deleteAsset(ctx: StateContext<TriggerModel>, {
    id,
    assetId
  }: TriggerActions.DeleteAsset): Observable<unknown> {
    return this.service.deleteAsset(id, assetId).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Trigger>(item => item?.id === id, patch(value))
      })))
    );
  }
}
