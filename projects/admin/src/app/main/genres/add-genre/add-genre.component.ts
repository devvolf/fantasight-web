import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddGenre } from '../../../shared/models/genre/add-genre.model';
import { addGenre } from '../state/genres.actions';
import { GenresState } from '../state/genres.reducers';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss'],
})
export class AddGenreComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });
  constructor(
    private genresStore: Store<GenresState>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const payload = {
      name: this.form.get('name')?.value!,
      description: this.form.get('description')?.value,
    } as AddGenre;

    this.genresStore.dispatch(addGenre({ payload }));
  }

  onCancel(): void {
    this.router.navigateByUrl('main/genres');
  }
}
