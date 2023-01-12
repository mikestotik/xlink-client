import { AssetPayload } from '../../../interfaces/asset.interface';


export namespace AssetActions {

  export class GetAll {
    public static readonly type = '[Asset] GetAll';
  }


  export class GetOne {
    public static readonly type = '[Asset] GetOne';


    constructor(
      public id: number) {
    }
  }


  export class Create {
    public static readonly type = '[Asset] Create';


    constructor(
      public value: AssetPayload) {
    }
  }


  export class Update {
    public static readonly type = '[Asset] Update';


    constructor(
      public id: number,
      public value: Partial<AssetPayload>) {
    }
  }


  export class Delete {
    public static readonly type = '[Asset] Delete';


    constructor(
      public id: number) {
    }
  }
}

