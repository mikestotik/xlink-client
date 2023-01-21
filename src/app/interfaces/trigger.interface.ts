import { Entity } from './entity.interface';


export interface TriggerPayload {
  title: string;
  desc?: string;
  recoveryTime?: Date;
  recoveryTrigger?: Trigger;
  triggered?: boolean;
}


export interface Trigger extends Entity, TriggerPayload {

}
