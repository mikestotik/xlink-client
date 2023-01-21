import { Entity } from './entity.interface';


export interface RecipePayload {
  title: string;
  desc?: string;
}


export interface Recipe extends Entity, RecipePayload {
  owner: number;
}
