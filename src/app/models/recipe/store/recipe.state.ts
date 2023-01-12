import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../../../interfaces/recipe.interface';
import { RecipeService } from '../services/recipe.service';
import { RecipeActions } from './recipe.actions';


interface RecipeModel {
  list: Recipe[];
}


@State<RecipeModel>({
  name: 'recipe'
})
@Injectable()
export class RecipeState {

  @Selector()
  public static selectAll(state: RecipeModel): Recipe[] {
    return state.list;
  }


  @Selector()
  public static selectOne(state: RecipeModel): (id: number) => Recipe {
    return (id: number): Recipe => {
      const value = state.list.find(i => i.id === id);
      if (!value) {
        throw new Error('Recipe not found');
      }
      return value;
    };
  }


  constructor(
    private readonly service: RecipeService) {
  }


  @Action(RecipeActions.GetAll)
  public getAll(ctx: StateContext<RecipeModel>): Observable<unknown> {
    return this.service.getAll().pipe(
      tap(list => ctx.setState(
        patch({ list })
      ))
    );
  }


  @Action(RecipeActions.GetOne)
  public getOne(ctx: StateContext<RecipeModel>, { id }: RecipeActions.GetOne): Observable<unknown> {
    return this.service.getOne(id).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Recipe>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(RecipeActions.Create)
  public create(ctx: StateContext<RecipeModel>, { value }: RecipeActions.Create): Observable<unknown> {
    return this.service.create(value).pipe(
      tap(value => ctx.setState(
        patch({ list: insertItem(value) })
      ))
    );
  }


  @Action(RecipeActions.Update)
  public update(ctx: StateContext<RecipeModel>, { id, value }: RecipeActions.Update): Observable<unknown> {
    return this.service.update(id, value).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Recipe>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(RecipeActions.Delete)
  public remove(ctx: StateContext<RecipeModel>, { id }: RecipeActions.Delete): Observable<unknown> {
    return this.service.delete(id).pipe(
      tap(() => ctx.setState(patch({
        list: removeItem<Recipe>(item => item?.id === id)
      })))
    );
  }
}
