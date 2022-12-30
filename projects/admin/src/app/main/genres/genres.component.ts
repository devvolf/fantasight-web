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
import { Genre } from '../../shared/models/genre/genre.model';
import { deleteGenre, getAllGenres } from './state/genres.actions';
import { GenresState } from './state/genres.reducers';
import { genres } from './state/genres.selectors';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  public searchText = '';
  private searchText$: BehaviorSubject<string>;
  public genres$: Observable<Genre[]>;

  private subscription: Subscription;

  constructor(private genresStore: Store<GenresState>, private router: Router) {
    this.subscription = new Subscription();

    this.genres$ = this.genresStore.select(genres);
    this.searchText$ = new BehaviorSubject('');
  }

  ngOnInit(): void {
    this.genresStore.dispatch(getAllGenres({}));
    this.subscription.add(
      this.searchText$
        .pipe(
          debounce(() => timer(800)),
          tap((searchText) => {
            this.genresStore.dispatch(getAllGenres({ searchText }));
          })
        )
        .subscribe()
    );
  }

  onSearchTextChange(text: string): void {
    this.searchText$.next(text);
  }

  onAdd(): void {
    this.router.navigateByUrl('main/genres/add');
  }

  onEdit(id: string): void {
    this.router.navigateByUrl(`main/genres/${id}/edit`);
  }

  onDelete(id: string): void {
    this.genresStore.dispatch(deleteGenre({ id }));
  }
}
