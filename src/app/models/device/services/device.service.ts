import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device, DevicePayload } from '../../../interfaces/device.interface';
import { DeviceResource } from '../resources/device.resource';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private readonly resource: DeviceResource) {
  }


  public getAll(): Observable<Device[]> {
    return this.resource.getAll();
  }


  public getOne(id: number): Observable<Device> {
    return this.resource.getOne(id);
  }


  public create(value: DevicePayload): Observable<Device> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<DevicePayload>): Observable<Device> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }
}
