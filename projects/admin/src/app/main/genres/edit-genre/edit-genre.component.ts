import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { EditGenre } from '../../../shared/models/edit-genre.model';
import { Genre } from '../../../shared/models/genre.model';
import { editGenre } from '../state/genres.actions';
import { GenresState } from '../state/genres.reducers';
import { genre } from '../state/genres.selectors';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.scss'],
})
export class EditGenreComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });

  private id = '';

  public genre$: Observable<Genre | undefined>;

  private subscription: Subscription;

  constructor(
    private genresStore: Store<GenresState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscription = new Subscription();
    this.genre$ = this.route.params.pipe(
      map((params: Params) => params['id']),
      tap((id) => (this.id = id)),
      switchMap((id: string) => this.genresStore.select(genre(id))),
      tap((genre: Genre | undefined) => {
        genre
          ? this.form.setValue({
              name: genre.name,
              description: genre.description ? genre.description : '',
            })
          : null;
      })
    );
  }

  ngOnInit(): void {
    this.subscription.add(this.genre$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const payload = {
      id: this.id,
      name: this.form.get('name')?.value!,
      description: this.form.get('description')?.value,
    } as EditGenre;

    this.genresStore.dispatch(editGenre({ payload }));
  }

  onCancel(): void {
    this.router.navigateByUrl('main/genres');
  }
}
