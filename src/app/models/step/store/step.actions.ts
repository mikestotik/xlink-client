import { StepPayload } from '../../../interfaces/step.interface';


export namespace StepActions {

  export class GetAll {
    public static readonly type = '[Step] GetAll';
  }


  export class GetOne {
    public static readonly type = '[Step] GetOne';


    constructor(
      public id: number) {
    }
  }


  export class Create {
    public static readonly type = '[Step] Create';


    constructor(
      public value: StepPayload) {
    }
  }


  export class Update {
    public static readonly type = '[Step] Update';


    constructor(
      public id: number,
      public value: Partial<StepPayload>) {
    }
  }


  export class Delete {
    public static readonly type = '[Step] Delete';


    constructor(
      public id: number) {
    }
  }
}

