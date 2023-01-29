import { ConditionalOperator } from '../enums/condition.enum';
import { Asset } from './asset.interface';
import { Entity } from './entity.interface';


export interface TriggerCondition {
  operator: ConditionalOperator;
  value: string;
  chain: string;
}


export interface TriggerPayload {
  title: string;
  desc?: string;
  chain?: string;
  recoveryTime?: number;
  recoveryTrigger?: number;
  triggered?: boolean;
  color?: string;
  disabled?: boolean;
  assets: Asset[];
  conditions?: TriggerCondition[];
}


export interface Trigger extends Entity, TriggerPayload {
  rule: number;
  owner: number;
}


