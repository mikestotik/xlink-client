import { Entity } from './entity.interface';


export interface DevicePayload {
  uuid: string;
  title: string;
  desc?: string;
  icon?: string;
}


export interface Device extends Entity, DevicePayload {
  owner: number;
}


export interface DeviceInfo {
  cores: number;
  model: string;
  revision: number;
  cpuFreq: number;
  cycleCount: number;
  flashChipMode: number;
  flashChipSize: number;
  flashChipSpeed: number;
  freeHeap: number;
  freePsram: number;
  freeSketchSpace: number;
  minFreeHeap: number;
  minFreePsram: number;
  maxAllocHeap: number;
  maxAllocPsram: number;
  psramSize: number;
  heapSize: number;
}
