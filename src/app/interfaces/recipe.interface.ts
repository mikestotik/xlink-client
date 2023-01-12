export interface RecipePayload {
  title: string;
  desc?: string;
}


export interface Recipe extends RecipePayload {
  id: number;
  owner: number;
}
