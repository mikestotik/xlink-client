export interface RulePayload {
  title: string;
  desc?: string;
  disabled?: boolean;
}


export interface Rule extends RulePayload {
  id: number;
  created: Date;
  updated: Date;
  step: number;
}
