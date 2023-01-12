import { Directive } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Directive({
  selector: '[appInput]'
})
export class InputDirective {

  constructor(
    private readonly ngControl: NgControl) {

    if (ngControl.valueAccessor) {
      trimValueAccessor(ngControl.valueAccessor);
    }
  }
}


function trimValueAccessor(valueAccessor: ControlValueAccessor): void {
  const original = valueAccessor.registerOnChange;

  valueAccessor.registerOnChange = (fn: (_: unknown) => void): void => {
    return original.call(valueAccessor, (value: unknown) => {
      return fn(typeof value === 'string' ? value.trim() : value);
    });
  };
}
