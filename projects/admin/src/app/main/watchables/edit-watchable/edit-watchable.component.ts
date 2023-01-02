import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import { Genre } from '../../../shared/models/genre/genre.model';
import { FilmPayload } from '../../../shared/models/watchable/film/film.model';
import { SeriePayload } from '../../../shared/models/watchable/serie/serie.model';
import {
  Watchable,
  WatchableType,
} from '../../../shared/models/watchable/watchable.model';
import { getAllCharacteristics } from '../../characteristics/state/characteristics.actions';
import { CharacteristicsState } from '../../characteristics/state/characteristics.reducers';
import { characteristics } from '../../characteristics/state/characteristics.selectors';
import { getAllGenres } from '../../genres/state/genres.actions';
import { GenresState } from '../../genres/state/genres.reducers';
import { genres } from '../../genres/state/genres.selectors';
import {
  addFilm,
  addSerie,
  editFilm,
  editSerie,
} from '../state/watchables.actions';
import { WatchablesState } from '../state/watchables.reducers';
import { watchable } from '../state/watchables.selectors';

@Component({
  selector: 'app-edit-watchable',
  templateUrl: './edit-watchable.component.html',
  styleUrls: ['./edit-watchable.component.scss'],
})
export class EditWatchableComponent implements OnInit {
  public genres$: Observable<Genre[]>;
  public characteristics$: Observable<Characteristic[]>;

  private id = '';
  public watchable$: Observable<Watchable | undefined>;
  public type = WatchableType.SERIE;

  constructor(
    private watchablesStore: Store<WatchablesState>,
    private genresStore: Store<GenresState>,
    private characteristicsStore: Store<CharacteristicsState>,
    private route: ActivatedRoute
  ) {
    this.genres$ = this.genresStore.select(genres);
    this.characteristics$ = this.characteristicsStore.select(characteristics);
    this.watchable$ = this.route.params.pipe(
      map((params: Params) => params['id']),
      tap((id) => (this.id = id)),
      switchMap((id: string) => this.watchablesStore.select(watchable(id))),
      tap((watchable: Watchable | undefined) => {
        if (watchable) {
          this.type = watchable.type;
        }
      })
    );
  }

  ngOnInit(): void {
    this.genresStore.dispatch(getAllGenres({}));
    this.characteristicsStore.dispatch(getAllCharacteristics({}));
  }

  get filmType(): boolean {
    return this.type === WatchableType.FILM;
  }

  switchType(): void {
    if (this.filmType) {
      this.type = WatchableType.SERIE;
      return;
    }

    this.type = WatchableType.FILM;
  }

  onSubmit(payload: FilmPayload | SeriePayload): void {
    if (this.filmType) {
      this.watchablesStore.dispatch(
        editFilm({ payload: payload as FilmPayload })
      );
      return;
    }

    this.watchablesStore.dispatch(
      editSerie({ payload: payload as SeriePayload })
    );
  }
}
