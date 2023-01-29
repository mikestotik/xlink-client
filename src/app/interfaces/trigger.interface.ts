import { Asset } from './asset.interface';
import { Entity } from './entity.interface';


export interface TriggerPayload {
  title: string;
  desc?: string;
  chain?: string;
  recoveryTime?: number;
  recoveryTrigger?: number;
  triggered?: boolean;

  assets: Asset[];
}


export interface Trigger extends Entity, TriggerPayload {
  rule: number;
  owner: number;
}
