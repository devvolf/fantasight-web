import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { changePassword } from '../../auth/state/auth.actions';
import { AuthState } from '../../auth/state/auth.reducers';
import { ChangePasswordRequest } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth/auth.service';
import {
  passwordsMatch,
  PasswordsMatchStateMatcher,
} from '../../shared/validators/passwordsMatch.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public passwordsMatcher = new PasswordsMatchStateMatcher();

  public form: FormGroup = new FormGroup({});

  constructor(
    private authStore: Store<AuthState>,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group(
      {
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [passwordsMatch],
      }
    );
  }

  get isPasswordRequired(): boolean {
    const control = this.form.get('password');
    return !!control?.dirty && !!control.hasError('required');
  }

  get passwordsNotMatch(): boolean {
    return !!this.form?.dirty && !!this.form.hasError('passwordsNotMatch');
  }

  ngOnInit(): void {}

  onGoBack(): void {
    this.router.navigateByUrl('/main');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const userId = this.authService.getLocalAuth()?.user.id;

    const request = {
      id: userId,
      password: this.form.get('password')?.value!,
    } as ChangePasswordRequest;

    this.authStore.dispatch(changePassword({ request }));
  }
}
