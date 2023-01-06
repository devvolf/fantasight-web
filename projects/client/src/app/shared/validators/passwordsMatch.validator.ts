import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const passwordsMatch: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let password = group.get('password')?.value;
  let repeatPassword = group.get('repeatPassword')?.value;

  return password === repeatPassword ? null : { passwordsNotMatch: true };
};

export class PasswordsMatchStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (
      (!!control?.touched && !!control?.invalid) ||
      (!!control?.touched &&
        !!form?.form.touched &&
        form.form.hasError('passwordsNotMatch'))
    );
  }
}
