import { RecipePayload } from '../../../interfaces/recipe.interface';


export namespace RecipeActions {

  export class GetAll {
    public static readonly type = '[Recipe] GetAll';
  }


  export class GetOne {
    public static readonly type = '[Recipe] GetOne';


    constructor(
      public id: number) {
    }
  }


  export class Create {
    public static readonly type = '[Recipe] Create';


    constructor(
      public value: RecipePayload) {
    }
  }


  export class Update {
    public static readonly type = '[Recipe] Update';


    constructor(
      public id: number,
      public value: Partial<RecipePayload>) {
    }
  }


  export class Delete {
    public static readonly type = '[Recipe] Delete';


    constructor(
      public id: number) {
    }
  }
}

