import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { RuleAction, RuleActionPayload } from '../../../interfaces/action.interface';


@Injectable({
  providedIn: 'root'
})
export class ActionResource {

  constructor(
    private readonly http: HttpClient) {
  }


  public getAll(): Observable<RuleAction[]> {
    return this.http.get<RuleAction[]>(ApiConfig.ACTION);
  }


  public getOne(id: number): Observable<RuleAction> {
    return this.http.get<RuleAction>(`${ ApiConfig.ACTION }/${ id }`);
  }


  public create(value: RuleActionPayload): Observable<RuleAction> {
    return this.http.post<RuleAction>(ApiConfig.ACTION, value);
  }


  public update(id: number, value: Partial<RuleActionPayload>): Observable<RuleAction> {
    return this.http.patch<RuleAction>(`${ ApiConfig.ACTION }/${ id }`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.ACTION }/${ id }`);
  }
}
