import { Pipe, PipeTransform } from '@angular/core';
import { ConditionalOperator } from '../../../enums/condition.enum';


@Pipe({
  name: 'assetCondition'
})
export class AssetConditionPipe implements PipeTransform {

  public transform(value: ConditionalOperator): string {
    switch (value) {
      case ConditionalOperator.Equal:
        return '==';
      case ConditionalOperator.NotEqual:
        return '!=';
      case ConditionalOperator.Less:
        return '<';
      case ConditionalOperator.More:
        return '>';
      case ConditionalOperator.LessOrEqual:
        return '<=';
      case ConditionalOperator.MoreOrEqual:
        return '<=';
    }
  }

}
