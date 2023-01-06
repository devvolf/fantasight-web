import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  passwordsMatch,
  PasswordsMatchStateMatcher,
} from '../../../shared/validators/passwordsMatch.validator';
import { register } from '../../state/auth.actions';
import { AuthState } from '../../state/auth.reducers';

const USERNAME_MIN_LENGTH = 5;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public passwordsMatcher = new PasswordsMatchStateMatcher();

  public form: FormGroup = new FormGroup({});

  constructor(
    private authStore: Store<AuthState>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(USERNAME_MIN_LENGTH),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [passwordsMatch],
      }
    );
  }

  get isUsernameRequired(): boolean {
    const control = this.form.get('username');
    return !!control?.dirty && !!control.hasError('required');
  }

  get isUsernameTooShort(): boolean {
    const control = this.form.get('username');
    return !!control?.dirty && !!control.hasError('minlength');
  }

  get isEmailRequired(): boolean {
    const control = this.form.get('email');
    return !!control?.dirty && !!control.hasError('required');
  }

  get isEmailInvalid(): boolean {
    const control = this.form.get('email');
    return !!control?.dirty && !!control.hasError('email');
  }

  get isPasswordRequired(): boolean {
    const control = this.form.get('password');
    return !!control?.dirty && !!control.hasError('required');
  }

  get passwordsNotMatch(): boolean {
    return !!this.form?.dirty && !!this.form.hasError('passwordsNotMatch');
  }

  get isAuthProcessing(): Observable<boolean> {
    return of(false);
    // return this.authStore.select(isProcessing);
  }

  ngOnInit(): void {}

  onGoBack(): void {
    this.router.navigateByUrl('/auth/login');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const request = {
      username: this.form.get('username')?.value!,
      email: this.form.get('email')?.value!,
      password: this.form.get('password')?.value!,
    };

    this.authStore.dispatch(register({ request }));
  }
}
