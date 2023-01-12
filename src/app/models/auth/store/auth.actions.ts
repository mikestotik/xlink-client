import { UserCredentials } from '../../../interfaces/account.interface';

export namespace AuthActions {
  export class Login {
    public static readonly type = '[Auth] Login';


    constructor(
      public payload: UserCredentials) {
    }
  }


  export class Logout {
    public static readonly type = '[Auth] Logout';
  }


  export class RefreshToken {
    public static readonly type = '[Auth] RefreshToken';
  }
}

