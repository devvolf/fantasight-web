import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../auth/state/auth.actions';
import { AuthState } from '../../../auth/state/auth.reducers';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private authStore: Store<AuthState>) {}

  ngOnInit(): void {}

  onLogout = (): void => {
    this.authStore.dispatch(logout());
  };
}
