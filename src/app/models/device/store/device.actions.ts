import { DevicePayload } from '../../../interfaces/device.interface';


export namespace DeviceActions {

  export class GetAll {
    public static readonly type = '[Device] GetAll';
  }


  export class GetOne {
    public static readonly type = '[Device] GetOne';


    constructor(
      public id: number) {
    }
  }


  export class Create {
    public static readonly type = '[Device] Create';


    constructor(
      public value: DevicePayload) {
    }
  }


  export class Update {
    public static readonly type = '[Device] Update';


    constructor(
      public id: number,
      public value: Partial<DevicePayload>) {
    }
  }


  export class Delete {
    public static readonly type = '[Device] Delete';


    constructor(
      public id: number) {
    }
  }
}

