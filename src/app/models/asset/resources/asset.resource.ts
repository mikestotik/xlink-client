import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { Asset, AssetPayload } from '../../../interfaces/asset.interface';


@Injectable({
  providedIn: 'root'
})
export class AssetResource {

  constructor(
    private readonly http: HttpClient) {
  }


  public getAll(): Observable<Asset[]> {
    return this.http.get<Asset[]>(ApiConfig.ASSET);
  }


  public getOne(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${ ApiConfig.ASSET }/${ id }`);
  }


  public create(value: AssetPayload): Observable<Asset> {
    return this.http.post<Asset>(ApiConfig.ASSET, value);
  }


  public update(id: number, value: Partial<AssetPayload>): Observable<Asset> {
    return this.http.patch<Asset>(`${ ApiConfig.ASSET }/${ id }`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.ASSET }/${ id }`);
  }
}
