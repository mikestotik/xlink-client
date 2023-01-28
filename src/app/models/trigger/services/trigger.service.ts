import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trigger, TriggerPayload } from '../../../interfaces/trigger.interface';
import { TriggerResource } from '../resources/trigger.resource';


@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  constructor(
    private readonly resource: TriggerResource) {
  }


  public getAll(): Observable<Trigger[]> {
    return this.resource.getAll();
  }


  public getOne(id: number): Observable<Trigger> {
    return this.resource.getOne(id);
  }


  public create(value: TriggerPayload): Observable<Trigger> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<TriggerPayload>): Observable<Trigger> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }
}
