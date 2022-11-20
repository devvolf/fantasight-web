import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../state/auth.actions';
import { AuthState } from '../state/auth.reducers';

const USERNAME_MIN_LENGTH = 8;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(USERNAME_MIN_LENGTH),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authStore: Store<AuthState>) {}

  get isUsernameRequired(): boolean {
    const control = this.form.get('username');
    return !!control?.dirty && !!control.hasError('required');
  }

  get isUsernameTooShort(): boolean {
    const control = this.form.get('username');
    return !!control?.dirty && !!control.hasError('minlength');
  }

  get isPasswordRequired(): boolean {
    const control = this.form.get('password');
    return !!control?.dirty && !!control.hasError('required');
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.authStore.dispatch(
      login({ authRequest: { username: 'Olafix', password: 'asdfasdf' } })
    );
    if (this.form.invalid) {
      return;
    }
  }
}
