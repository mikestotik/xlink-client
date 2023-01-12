import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { AccountActions } from '../models/account/store/account.actions';


@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<boolean> {

  constructor(
    private store: Store) {
  }


  public resolve(): Observable<boolean> {
    return this.store.dispatch(new AccountActions.GetAccount()).pipe(
      filter(value => !!value)
    );
  }
}
