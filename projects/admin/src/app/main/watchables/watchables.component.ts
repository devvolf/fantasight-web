import { Component, OnInit } from '@angular/core';
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
import { Watchable } from '../../shared/models/watchable/watchable.model';
import { deleteWatchable, getAllWatchables } from './state/watchables.actions';
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

  public watchables$: Observable<Watchable[]>;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private watchablesStore: Store<WatchablesState>
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

  onAdd(): void {
    this.router.navigateByUrl('/main/watchables/add');
  }

  onEdit(id: string): void {
    this.router.navigateByUrl(`main/watchables/${id}/edit`);
  }

  onDelete(id: string): void {
    this.watchablesStore.dispatch(deleteWatchable({ id }));
  }
}
