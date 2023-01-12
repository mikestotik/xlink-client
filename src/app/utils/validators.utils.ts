import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export class FormValidators {
  public static passwordConfirm: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')!.value;
    const confirmPass = group.get('passwordConfirm')!.value;
    return pass === confirmPass ? null : { notSame: true };
  };
}
