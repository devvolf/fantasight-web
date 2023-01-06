import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  debounce,
  Observable,
  Subscription,
  tap,
  timer,
} from 'rxjs';
import { Watchable } from '../../shared/models/watchable.model';
import { WatchableInfoComponent } from '../watchable-info/watchable-info.component';
import { getAllWatchables } from './state/watchables.actions';
import { WatchablesState } from './state/watchables.reducers';
import { watchables } from './state/watchables.selectors';

@Component({
  selector: 'app-watchables',
  templateUrl: './watchables.component.html',
  styleUrls: ['./watchables.component.scss'],
})
export class WatchablesComponent implements OnInit {
  public searchText = '';
  private searchText$: BehaviorSubject<string>;

  public watchables$: Observable<any[]>;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private watchablesStore: Store<WatchablesState>,
    private dialog: MatDialog
  ) {
    this.subscription = new Subscription();
    this.watchables$ = this.watchablesStore.select(watchables);
    this.searchText$ = new BehaviorSubject('');
  }

  ngOnInit(): void {
    this.watchablesStore.dispatch(getAllWatchables({}));
    this.subscription.add(
      this.searchText$
        .pipe(
          debounce(() => timer(800)),
          tap((searchText) => {
            this.watchablesStore.dispatch(getAllWatchables({ searchText }));
          })
        )
        .subscribe()
    );
  }

  onSearchTextChange(text: string): void {
    this.searchText$.next(text);
  }

  onSelected(watchable: Watchable): void {
    this.dialog.open(WatchableInfoComponent, { data: watchable });
  }
}
