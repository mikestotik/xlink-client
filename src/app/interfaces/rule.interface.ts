import { Entity } from './entity.interface';


export interface RulePayload {
  title: string;
  desc?: string;
  disabled?: boolean;
}


export interface Rule extends Entity, RulePayload {
  step: number;
}
