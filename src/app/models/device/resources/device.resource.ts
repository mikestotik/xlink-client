import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { Device, DevicePayload } from '../../../interfaces/device.interface';


@Injectable({
  providedIn: 'root'
})
export class DeviceResource {

  constructor(
    private readonly http: HttpClient) {
  }


  public getAll(): Observable<Device[]> {
    return this.http.get<Device[]>(ApiConfig.DEVICE);
  }


  public getOne(id: number): Observable<Device> {
    return this.http.get<Device>(`${ ApiConfig.DEVICE }/${ id }`);
  }


  public create(value: DevicePayload): Observable<Device> {
    return this.http.post<Device>(ApiConfig.DEVICE, value);
  }


  public update(id: number, value: Partial<DevicePayload>): Observable<Device> {
    return this.http.patch<Device>(`${ ApiConfig.DEVICE }/${ id }`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.DEVICE }/${ id }`);
  }
}
