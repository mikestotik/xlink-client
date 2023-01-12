import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { Recipe, RecipePayload } from '../../../interfaces/recipe.interface';


@Injectable({
  providedIn: 'root'
})
export class RecipeResource {

  constructor(
    private readonly http: HttpClient) {
  }


  public getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(ApiConfig.RECIPE);
  }


  public getOne(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${ApiConfig.RECIPE}/${id}`);
  }


  public create(value: RecipePayload): Observable<Recipe> {
    return this.http.post<Recipe>(ApiConfig.RECIPE, value);
  }


  public update(id: number, value: Partial<RecipePayload>): Observable<Recipe> {
    return this.http.patch<Recipe>(`${ApiConfig.RECIPE}/${id}`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiConfig.RECIPE}/${id}`);
  }
}
