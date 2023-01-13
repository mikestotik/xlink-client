import { Pipe, PipeTransform } from '@angular/core';
import { StepStatus } from '../../../enums/step.enum';


@Pipe({
  name: 'stepStatus'
})
export class StepStatusPipe implements PipeTransform {

  public transform(status: StepStatus): string {
    switch (status) {
      case StepStatus.Running:
        return 'Running';
      case StepStatus.Pending:
        return 'Pending';
      case StepStatus.Completed:
        return 'Completed';
      case StepStatus.Stopped:
        return 'Stopped';
    }
    return '';
  }

}
