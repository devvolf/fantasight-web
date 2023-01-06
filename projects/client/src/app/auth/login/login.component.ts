import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { login } from '../state/auth.actions';
import { AuthState } from '../state/auth.reducers';

const USERNAME_MIN_LENGTH = 5;

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

  constructor(private authStore: Store<AuthState>, private router: Router) {}

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

  onRegister(): void {
    this.router.navigateByUrl('/auth/register');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const authRequest = {
      username: this.form.get('username')?.value!,
      password: this.form.get('password')?.value!,
    };

    this.authStore.dispatch(login({ authRequest }));
  }
}
