import { AssetPermission, AssetUnit, DataType } from '../enums/asset.enum';
import { Entity } from './entity.interface';


export interface AssetMeta<T = number> {
  default: T;
  min: T;
  max: T;
  unit: AssetUnit;
}


export interface AssetPayload {
  title: string;
  desc?: string;
  icon?: string;
  permission: AssetPermission;
  type: DataType;
  meta: AssetMeta;
  link: string;
  device: number;
}


export interface Asset extends Entity, AssetPayload {
  owner: number;
}
