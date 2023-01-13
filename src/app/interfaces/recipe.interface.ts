export interface RecipePayload {
  title: string;
  desc?: string;
}


export interface Recipe extends RecipePayload {
  id: number;
  created: Date | string;
  updated: Date | string;
  owner: number;
}
