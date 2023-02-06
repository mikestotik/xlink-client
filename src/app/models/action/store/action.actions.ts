import { RuleActionPayload } from '../../../interfaces/action.interface';


export namespace RuleActionActions {

  export class GetAll {
    public static readonly type = '[Action] GetAll';
  }


  export class GetOne {
    public static readonly type = '[Action] GetOne';


    constructor(
      public id: number) {
    }
  }


  export class Create {
    public static readonly type = '[Action] Create';


    constructor(
      public value: RuleActionPayload) {
    }
  }


  export class Update {
    public static readonly type = '[Action] Update';


    constructor(
      public id: number,
      public value: Partial<RuleActionPayload>) {
    }
  }


  export class Delete {
    public static readonly type = '[Action] Delete';


    constructor(
      public id: number) {
    }
  }
}

