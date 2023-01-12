import { ConnectorType } from '../enums/connector.enum';
import { MQTTConnector } from './connector.interface';
import { Entity } from './entity.interface';


export enum RelayType {
  Socket,
  Pump,
  Aerator,
}


export enum RelayValue {
  Off,
  On,
}


export interface Relay {
  id: number;
  type: RelayType;
}


export interface SensorValue {
  id: number;
  name: string;
  min: number;
  max: number;
}


export enum SensorType {
  Light,
  Air,
  Soil,
}


export interface Sensor {
  id: number;
  type: SensorType;
  values: SensorValue[];
}


export interface DevicePayload {
  uuid: string;
  title: string;
  type: ConnectorType;
  connector: MQTTConnector;
  desc?: string;
  meta?: unknown;
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
