import { ActionType } from '../enums/action.enum';
import { Entity } from './entity.interface';


export interface RuleActionPayload {
  title: string;
  desc?: string;
  type: ActionType;
  payload: string;
  disabled?: boolean;
  rule: number;
}


export interface RuleAction extends Entity, RuleActionPayload {
  owner: number;
}
