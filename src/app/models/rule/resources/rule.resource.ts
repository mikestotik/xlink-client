import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { Rule, RulePayload } from '../../../interfaces/rule.interface';


@Injectable({
  providedIn: 'root'
})
export class RuleResource {

  constructor(
    private readonly http: HttpClient) {
  }


  public getAll(): Observable<Rule[]> {
    return this.http.get<Rule[]>(ApiConfig.RULE);
  }


  public getOne(id: number): Observable<Rule> {
    return this.http.get<Rule>(`${ ApiConfig.RULE }/${ id }`);
  }


  public create(value: RulePayload): Observable<Rule> {
    return this.http.post<Rule>(ApiConfig.RULE, value);
  }


  public update(id: number, value: Partial<RulePayload>): Observable<Rule> {
    return this.http.patch<Rule>(`${ ApiConfig.RULE }/${ id }`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.RULE }/${ id }`);
  }
}
