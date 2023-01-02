import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
  public watchables$: Observable<Watchable[]>;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private watchablesStore: Store<WatchablesState>
  ) {
    this.subscription = new Subscription();
    this.watchables$ = this.watchablesStore.select(watchables);
  }

  ngOnInit(): void {
    this.watchablesStore.dispatch(getAllWatchables({}));
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
