import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounce, Subscription, tap, timer } from 'rxjs';
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
  @Output() onSearchTextChange: EventEmitter<string> = new EventEmitter();

  public searchText = '';
  private searchText$: BehaviorSubject<string> = new BehaviorSubject('');

  private subscription: Subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.searchText$
        .pipe(
          debounce(() => timer(800)),
          tap((searchText) => {
            this.onSearchTextChange.emit(searchText);
          })
        )
        .subscribe()
    );
  }

  ngOnInit(): void {}

  onChangePasswordFn = (): void => {
    this.onChangePassword.emit();
  };

  onLogoutFn = (): void => {
    this.onLogout.emit();
  };

  onSearchTextChangeFn(text: string): void {
    this.searchText$.next(text);
  }
}
