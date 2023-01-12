import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { Device } from '../../../interfaces/device.interface';
import { DeviceService } from '../services/device.service';
import { DeviceActions } from './device.actions';


interface DeviceModel {
  list: Device[];
}


@State<DeviceModel>({
  name: 'device'
})
@Injectable()
export class DeviceState {

  @Selector()
  public static selectAll(state: DeviceModel): Device[] {
    return state.list;
  }


  @Selector()
  public static selectOne(state: DeviceModel): (id: number) => Device {
    return (id: number): Device => {
      const value = state.list.find(i => i.id === id);
      if (!value) {
        throw new Error('Device not found');
      }
      return value;
    };
  }


  constructor(
    private readonly service: DeviceService) {
  }


  @Action(DeviceActions.GetAll)
  public getAll(ctx: StateContext<DeviceModel>): Observable<unknown> {
    return this.service.getAll().pipe(
      tap(list => ctx.setState(
        patch({ list })
      ))
    );
  }


  @Action(DeviceActions.GetOne)
  public getOne(ctx: StateContext<DeviceModel>, { id }: DeviceActions.GetOne): Observable<unknown> {
    return this.service.getOne(id).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Device>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(DeviceActions.Create)
  public create(ctx: StateContext<DeviceModel>, { value }: DeviceActions.Create): Observable<unknown> {
    return this.service.create(value).pipe(
      tap(value => ctx.setState(
        patch({ list: insertItem(value) })
      ))
    );
  }


  @Action(DeviceActions.Update)
  public update(ctx: StateContext<DeviceModel>, { id, value }: DeviceActions.Update): Observable<unknown> {
    return this.service.update(id, value).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Device>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(DeviceActions.Delete)
  public remove(ctx: StateContext<DeviceModel>, { id }: DeviceActions.Delete): Observable<unknown> {
    return this.service.delete(id).pipe(
      tap(() => ctx.setState(patch({
        list: removeItem<Device>(item => item?.id === id)
      })))
    );
  }
}
