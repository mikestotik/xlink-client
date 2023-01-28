import { TriggerPayload } from '../../../interfaces/trigger.interface';


export namespace TriggerActions {

  export class GetAll {
    public static readonly type = '[Trigger] GetAll';
  }


  export class GetOne {
    public static readonly type = '[Trigger] GetOne';


    constructor(
      public id: number) {
    }
  }


  export class Create {
    public static readonly type = '[Trigger] Create';


    constructor(
      public value: TriggerPayload) {
    }
  }


  export class Update {
    public static readonly type = '[Trigger] Update';


    constructor(
      public id: number,
      public value: Partial<TriggerPayload>) {
    }
  }


  export class Delete {
    public static readonly type = '[Trigger] Delete';


    constructor(
      public id: number) {
    }
  }
}

