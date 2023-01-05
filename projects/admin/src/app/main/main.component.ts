import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { internalLogin } from '../auth/state/auth.actions';
import { AuthState } from '../auth/state/auth.reducers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private authStore: Store<AuthState>) {}

  ngOnInit(): void {
    console.log('chuj')
    // this.authStore.dispatch(internalLogin());
  }
}
