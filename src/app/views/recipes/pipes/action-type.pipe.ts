import { Pipe, PipeTransform } from '@angular/core';
import { ActionType } from '../../../enums/action.enum';


@Pipe({
  name: 'actionTypeName'
})
export class ActionTypeNamePipe implements PipeTransform {

  public transform(status: ActionType): string {
    switch (status) {
      case ActionType.Email:
        return 'Email';
      case ActionType.Alert:
        return 'Alert';
      case ActionType.AssetControl:
        return 'Asset Control';
      case ActionType.StepControl:
        return 'Step Control';
    }
    return '';
  }

}
