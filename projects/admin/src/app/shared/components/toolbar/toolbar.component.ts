import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../auth/state/auth.actions';
import { AuthState } from '../../../auth/state/auth.reducers';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() username: string = '';
  @Output() onChangePassword: EventEmitter<void> = new EventEmitter();
  @Output() onLogout: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onChangePasswordFn = (): void => {
    this.onChangePassword.emit();
  };

  onLogoutFn = (): void => {
    this.onLogout.emit();
  };
}
