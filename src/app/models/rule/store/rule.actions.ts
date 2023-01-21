import { RulePayload } from '../../../interfaces/rule.interface';


export namespace RuleActions {

  export class GetAll {
    public static readonly type = '[Rule] GetAll';
  }


  export class GetOne {
    public static readonly type = '[Rule] GetOne';


    constructor(
      public id: number) {
    }
  }


  export class Create {
    public static readonly type = '[Rule] Create';


    constructor(
      public value: RulePayload) {
    }
  }


  export class Update {
    public static readonly type = '[Rule] Update';


    constructor(
      public id: number,
      public value: Partial<RulePayload>) {
    }
  }


  export class Delete {
    public static readonly type = '[Rule] Delete';


    constructor(
      public id: number) {
    }
  }
}

