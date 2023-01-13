import { StepStatus, StepType } from '../enums/step.enum';
import { Entity } from './entity.interface';


export interface StepPayload {
  order: number;
  title: string;
  desc?: string;
  timer?: Date;
  type: StepType;
  recipe: number;
  disabled?: boolean;
}


export interface Step extends Entity, StepPayload {
  status: StepStatus;
  owner: number;
  disabled?: boolean;
}
