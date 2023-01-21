import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule, RulePayload } from '../../../interfaces/rule.interface';
import { RuleResource } from '../resources/rule.resource';


@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(
    private readonly resource: RuleResource) {
  }


  public getAll(): Observable<Rule[]> {
    return this.resource.getAll();
  }


  public getOne(id: number): Observable<Rule> {
    return this.resource.getOne(id);
  }


  public create(value: RulePayload): Observable<Rule> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<RulePayload>): Observable<Rule> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }
}
