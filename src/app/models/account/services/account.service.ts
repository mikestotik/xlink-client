import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountActivation, AccountRegister, User } from '../../../interfaces/account.interface';
import { AccountResource } from '../resources/account.resource';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private resource: AccountResource) {
  }


  public register(payload: AccountRegister): Observable<void> {
    return this.resource.create(payload);
  }


  public activate(activation: AccountActivation): Observable<unknown> {
    return this.resource.activate(activation);
  }


  public getCurrent(): Observable<User> {
    return this.resource.getCurrent();
  }


  public update(value: Partial<User>): Observable<User> {
    return this.resource.update(value);
  }
}
