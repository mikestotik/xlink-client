import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { Trigger, TriggerPayload } from '../../../interfaces/trigger.interface';


@Injectable({
  providedIn: 'root'
})
export class TriggerResource {

  constructor(
    private readonly http: HttpClient) {
  }


  public getAll(): Observable<Trigger[]> {
    return this.http.get<Trigger[]>(ApiConfig.TRIGGER);
  }


  public getOne(id: number): Observable<Trigger> {
    return this.http.get<Trigger>(`${ ApiConfig.TRIGGER }/${ id }`);
  }


  public create(value: TriggerPayload): Observable<Trigger> {
    return this.http.post<Trigger>(ApiConfig.TRIGGER, value);
  }


  public update(id: number, value: Partial<TriggerPayload>): Observable<Trigger> {
    return this.http.patch<Trigger>(`${ ApiConfig.TRIGGER }/${ id }`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.TRIGGER }/${ id }`);
  }


  public addAsset(id: number, assetId: number): Observable<Trigger> {
    return this.http.post<Trigger>(`${ ApiConfig.TRIGGER }/${ id }/assets/${ assetId }`, {});
  }


  public deleteAsset(id: number, assetId: number): Observable<Trigger> {
    return this.http.delete<Trigger>(`${ ApiConfig.TRIGGER }/${ id }/assets/${ assetId }`);
  }

}
