import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RuleAction, RuleActionPayload } from '../../../interfaces/action.interface';
import { ActionResource } from '../resources/action.resource';


@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private readonly resource: ActionResource) {
  }


  public getAll(): Observable<RuleAction[]> {
    return this.resource.getAll();
  }


  public getOne(id: number): Observable<RuleAction> {
    return this.resource.getOne(id);
  }


  public create(value: RuleActionPayload): Observable<RuleAction> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<RuleActionPayload>): Observable<RuleAction> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }
}
