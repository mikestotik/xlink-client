import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { Step } from '../../../interfaces/step.interface';
import { StepService } from '../services/step.service';
import { StepActions } from './step.actions';


interface StepModel {
  list: Step[];
}


@State<StepModel>({
  name: 'step'
})
@Injectable()
export class StepState {

  @Selector()
  public static selectAll(state: StepModel): Step[] {
    return state.list;
  }


  @Selector()
  public static selectOne(state: StepModel): (id: number) => Step {
    return (id: number): Step => {
      const value = state.list.find(i => i.id === id);
      if (!value) {
        throw new Error('Step not found');
      }
      return value;
    };
  }


  @Selector()
  public static selectByRecipe(state: StepModel): (recipeId: number) => Step[] {
    return (recipeId: number): Step[] => state.list.filter(i => i.recipe === recipeId);
  }


  constructor(
    private readonly service: StepService) {
  }


  @Action(StepActions.GetAll)
  public getAll(ctx: StateContext<StepModel>): Observable<Step[]> {
    return this.service.getAll().pipe(
      tap(list => ctx.setState(
        patch({ list })
      ))
    );
  }


  @Action(StepActions.GetOne)
  public getOne(ctx: StateContext<StepModel>, { id }: StepActions.GetOne): Observable<unknown> {
    return this.service.getOne(id).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Step>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(StepActions.Create)
  public create(ctx: StateContext<StepModel>, { value }: StepActions.Create): Observable<unknown> {
    return this.service.create(value).pipe(
      tap(value => ctx.setState(
        patch({ list: insertItem(value) })
      ))
    );
  }


  @Action(StepActions.Update)
  public update(ctx: StateContext<StepModel>, { id, value }: StepActions.Update): Observable<unknown> {
    return this.service.update(id, value).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Step>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(StepActions.Delete)
  public remove(ctx: StateContext<StepModel>, { id }: StepActions.Delete): Observable<unknown> {
    return this.service.delete(id).pipe(
      tap(() => ctx.setState(patch({
        list: removeItem<Step>(item => item?.id === id)
      })))
    );
  }
}
