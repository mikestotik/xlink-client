import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { User } from '../../../interfaces/account.interface';
import { AccountService } from '../services/account.service';
import { AccountActions } from './account.actions';


export interface AccountModel {
  user: User;
}


@State<AccountModel>({
  name: 'account'
})
@Injectable()
export class AccountState {

  @Selector()
  public static user(state: AccountModel): User {
    return state.user;
  }


  constructor(
    private accountService: AccountService) {
  }


  @Action(AccountActions.RegisterAccount)
  public register(ctx: StateContext<AccountModel>, action: AccountActions.RegisterAccount): Observable<void> {
    return this.accountService.register(action.payload);
  }


  @Action(AccountActions.ActivateAccount)
  public activate(ctx: StateContext<AccountModel>, action: AccountActions.ActivateAccount): Observable<unknown> {
    return this.accountService.activate(action.payload);
  }


  @Action(AccountActions.GetAccount)
  public getMe(ctx: StateContext<AccountModel>): Observable<User> {
    return this.accountService.getCurrent().pipe(
      tap(user => ctx.setState(
        patch({ user })
      ))
    );
  }


  @Action(AccountActions.UpdateAccount)
  public update(ctx: StateContext<AccountModel>, { value }: AccountActions.UpdateAccount): Observable<User> {
    return this.accountService.update(value).pipe(
      tap(user => ctx.setState(
        patch({ user })
      ))
    );
  }
}
