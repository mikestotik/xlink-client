import { Entity } from './entity.interface';


export interface ProgramPayload {
  title: string;
  device: number;
}


export interface Program extends Entity, ProgramPayload {
  ttl: number;
  enabled: boolean;
  owner: number;
}
