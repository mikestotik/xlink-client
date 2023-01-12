import { AccountActivation, AccountRegister, User } from '../../../interfaces/account.interface';


export namespace AccountActions {
  export class RegisterAccount {
    public static readonly type = '[Account] RegisterAccount';


    constructor(
      public payload: AccountRegister) {
    }
  }


  export class ActivateAccount {
    public static readonly type = '[Account] ActivateAccount';


    constructor(
      public payload: AccountActivation) {
    }
  }


  export class GetAccount {
    public static readonly type = '[Account] GetAccount';
  }


  export class UpdateAccount {
    public static readonly type = '[Account] UpdateAccount';


    constructor(
      public value: Partial<User>) {
    }
  }
}
