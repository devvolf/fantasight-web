import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import { Genre } from '../../../shared/models/genre/genre.model';
import { FilmPayload } from '../../../shared/models/watchable/film/film.model';
import { SeriePayload } from '../../../shared/models/watchable/serie/serie.model';
import { WatchableType } from '../../../shared/models/watchable/watchable.model';
import { getAllCharacteristics } from '../../characteristics/state/characteristics.actions';
import { CharacteristicsState } from '../../characteristics/state/characteristics.reducers';
import { characteristics } from '../../characteristics/state/characteristics.selectors';
import { getAllGenres } from '../../genres/state/genres.actions';
import { GenresState } from '../../genres/state/genres.reducers';
import { genres } from '../../genres/state/genres.selectors';
import { addFilm, addSerie } from '../state/watchables.actions';
import { WatchablesState } from '../state/watchables.reducers';

@Component({
  selector: 'app-add-watchable',
  templateUrl: './add-watchable.component.html',
  styleUrls: ['./add-watchable.component.scss'],
})
export class AddWatchableComponent implements OnInit {
  public genres$: Observable<Genre[]>;
  public characteristics$: Observable<Characteristic[]>;

  public type = WatchableType.FILM;

  constructor(
    private watchablesStore: Store<WatchablesState>,
    private genresStore: Store<GenresState>,
    private characteristicsStore: Store<CharacteristicsState>
  ) {
    this.genres$ = this.genresStore.select(genres);
    this.characteristics$ = this.characteristicsStore.select(characteristics);
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
        addFilm({ payload: payload as FilmPayload })
      );
      return;
    }

    this.watchablesStore.dispatch(
      addSerie({ payload: payload as SeriePayload })
    );
  }
}
