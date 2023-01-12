import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, RecipePayload } from '../../../interfaces/recipe.interface';
import { RecipeResource } from '../resources/recipe.resource';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private readonly resource: RecipeResource) {
  }


  public getAll(): Observable<Recipe[]> {
    return this.resource.getAll();
  }


  public getOne(id: number): Observable<Recipe> {
    return this.resource.getOne(id);
  }


  public create(value: RecipePayload): Observable<Recipe> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<RecipePayload>): Observable<Recipe> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }
}
