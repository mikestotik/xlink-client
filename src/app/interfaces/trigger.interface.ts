import { Entity } from './entity.interface';


export interface TriggerPayload {
  title: string;
  desc?: string;
  chain?: string;
  recoveryTime?: number;
  recoveryTrigger?: number;
  triggered?: boolean;
}


export interface Trigger extends Entity, TriggerPayload {
  rule: number;
  owner: number;
}
