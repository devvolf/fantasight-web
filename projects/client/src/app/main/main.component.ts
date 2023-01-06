import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../auth/state/auth.actions';
import { AuthState } from '../auth/state/auth.reducers';
import { AuthService } from '../core/services/auth/auth.service';
import { WatchablesService } from '../core/services/watchables/watchables.service';
import { UserData } from '../shared/models/user-data.model';
import { getAllWatchables } from './watchables/state/watchables.actions';
import { WatchablesState } from './watchables/state/watchables.reducers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public user: UserData | null;

  constructor(
    private authStore: Store<AuthState>,
    private watchablesStore: Store<WatchablesState>,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getLocalAuth()?.user || null;
  }

  get username(): string {
    return this.user?.username || '';
  }

  ngOnInit(): void {}

  onChangePassword(): void {
    this.router.navigateByUrl('/main/change-password');
  }

  onLogout(): void {
    this.authStore.dispatch(logout());
  }

  onSearchTextChange(text: string): void {
    this.watchablesStore.dispatch(getAllWatchables({ searchText: text}));
  } 
}
