import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { Step, StepPayload } from '../../../interfaces/step.interface';


@Injectable({
  providedIn: 'root'
})
export class StepResource {

  constructor(
    private readonly http: HttpClient) {
  }


  public getAll(): Observable<Step[]> {
    return this.http.get<Step[]>(ApiConfig.STEP);
  }


  public getOne(id: number): Observable<Step> {
    return this.http.get<Step>(`${ ApiConfig.STEP }/${ id }`);
  }


  public create(value: StepPayload): Observable<Step> {
    return this.http.post<Step>(ApiConfig.STEP, value);
  }


  public update(id: number, value: Partial<StepPayload>): Observable<Step> {
    return this.http.patch<Step>(`${ ApiConfig.STEP }/${ id }`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.STEP }/${ id }`);
  }
}
