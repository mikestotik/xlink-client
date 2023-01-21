import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { Rule } from '../../../interfaces/rule.interface';
import { RuleService } from '../services/rule.service';
import { RuleActions } from './rule.actions';


interface RuleModel {
  list: Rule[];
}


@State<RuleModel>({
  name: 'rule'
})
@Injectable()
export class RuleState {

  @Selector()
  public static selectAll(state: RuleModel): Rule[] {
    return state.list;
  }


  @Selector()
  public static selectOne(state: RuleModel): (id: number) => Rule {
    return (id: number): Rule => {
      const value = state.list.find(i => i.id === id);
      if (!value) {
        throw new Error('Rule not found');
      }
      return value;
    };
  }


  @Selector()
  public static selectByStep(state: RuleModel): (stepId: number) => Rule[] {
    return (stepId: number): Rule[] => state.list.filter(i => i.step === stepId);
  }


  constructor(
    private readonly service: RuleService) {
  }


  @Action(RuleActions.GetAll)
  public getAll(ctx: StateContext<RuleModel>): Observable<Rule[]> {
    return this.service.getAll().pipe(
      tap(list => ctx.setState(
        patch({ list })
      ))
    );
  }


  @Action(RuleActions.GetOne)
  public getOne(ctx: StateContext<RuleModel>, { id }: RuleActions.GetOne): Observable<unknown> {
    return this.service.getOne(id).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Rule>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(RuleActions.Create)
  public create(ctx: StateContext<RuleModel>, { value }: RuleActions.Create): Observable<unknown> {
    return this.service.create(value).pipe(
      tap(value => ctx.setState(
        patch({ list: insertItem(value) })
      ))
    );
  }


  @Action(RuleActions.Update)
  public update(ctx: StateContext<RuleModel>, { id, value }: RuleActions.Update): Observable<unknown> {
    return this.service.update(id, value).pipe(
      tap(value => ctx.setState(patch({
        list: updateItem<Rule>(item => item?.id === id, patch(value))
      })))
    );
  }


  @Action(RuleActions.Delete)
  public remove(ctx: StateContext<RuleModel>, { id }: RuleActions.Delete): Observable<unknown> {
    return this.service.delete(id).pipe(
      tap(() => ctx.setState(patch({
        list: removeItem<Rule>(item => item?.id === id)
      })))
    );
  }
}
