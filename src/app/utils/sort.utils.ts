import { Step } from '../interfaces/step.interface';


export namespace SortUtils {
  export function byOrder(a: Step, b: Step) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }
}
