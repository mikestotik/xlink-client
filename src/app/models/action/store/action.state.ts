import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { RuleAction } from '../../../interfaces/action.interface';
import { ActionService } from '../services/action.service';
import { RuleActionActions } from './action.actions';


interface ActionModel {
  list: RuleAction[];
}


@State<ActionModel>({
  name: 'action'
})
@Injectable()
export class ActionState {

  @Selector()
  public static selectAll(state: ActionModel): RuleAction[] {
    return state.list;
  }


  @Selector()
  public static selectOne(state: ActionModel): (id: number) => RuleAction | null {
    return (id: number): RuleAction | null => {
      const value = state.list.find(i => i.id === id);
      if (!value) {
        return null;
      }
      return value;
    };
  }


  @Selector()
  public static selectByRule(state: ActionModel): (ruleId: number) => RuleAction[] {
    return (ruleId: number): RuleAction[] => state.list.filter(i => i.rule === ruleId);
  }


  constructor(
    private readonly service: ActionService) {
  }


  @Action(RuleActionActions.GetAll)
  public getAll(ctx: StateContext<ActionModel>): Observable<RuleAction[]> {
    return this.service.getAll().pipe(
      tap(list => ctx.setState(
        patch({ list })
      ))
    );
  }


  @Action(RuleActionActions.GetOne)
  public getOne(ctx: StateContext<ActionModel>, { id }: RuleActionActions.GetOne): Observable<unknown> {
    return this.service.getOne(id).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<RuleAction>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(RuleActionActions.Create)
  public create(ctx: StateContext<ActionModel>, { value }: RuleActionActions.Create): Observable<unknown> {
    return this.service.create(value).pipe(
      tap(value => ctx.setState(
        patch({ list: insertItem(value) })
      ))
    );
  }


  @Action(RuleActionActions.Update)
  public update(ctx: StateContext<ActionModel>, { id, value }: RuleActionActions.Update): Observable<unknown> {
    return this.service.update(id, value).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<RuleAction>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(RuleActionActions.Delete)
  public remove(ctx: StateContext<ActionModel>, { id }: RuleActionActions.Delete): Observable<unknown> {
    return this.service.delete(id).pipe(
      tap(() => ctx.setState(patch({
        list: removeItem<RuleAction>(item => item?.id === id)
      })))
    );
  }
}
