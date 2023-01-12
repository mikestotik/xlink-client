import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset, AssetPayload } from '../../../interfaces/asset.interface';
import { AssetResource } from '../resources/asset.resource';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(
    private readonly resource: AssetResource) {
  }


  public getAll(): Observable<Asset[]> {
    return this.resource.getAll();
  }


  public getOne(id: number): Observable<Asset> {
    return this.resource.getOne(id);
  }


  public create(value: AssetPayload): Observable<Asset> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<AssetPayload>): Observable<Asset> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }
}
