import { StepStatus, StepType } from "../enums/step.enum";

export interface Step {
  title: string;
  desc?: string;
  timer?: Date;
  status: StepStatus;
  type: StepType;
  // rules
}