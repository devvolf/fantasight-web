import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import { Genre } from '../../../shared/models/genre/genre.model';
import {
  AddWatchable,
  AddWatchablePayload,
} from '../../../shared/models/watchable/add-watchable.model';
import { getAllCharacteristics } from '../../characteristics/state/characteristics.actions';
import { CharacteristicsState } from '../../characteristics/state/characteristics.reducers';
import { characteristics } from '../../characteristics/state/characteristics.selectors';
import { getAllGenres } from '../../genres/state/genres.actions';
import { GenresState } from '../../genres/state/genres.reducers';
import { genres } from '../../genres/state/genres.selectors';
import { addWatchable } from '../state/watchables.actions';
import { WatchablesState } from '../state/watchables.reducers';

@Component({
  selector: 'app-add-watchable',
  templateUrl: './add-watchable.component.html',
  styleUrls: ['./add-watchable.component.scss'],
})
export class AddWatchableComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    genres: new FormControl([], []),
    characteristics: new FormControl([], []),
  });

  public genres$: Observable<Genre[]>;
  public characteristics$: Observable<Characteristic[]>;

  public selectedImage: File | null = null;
  public selectedImageSource: string | ArrayBuffer | null = null;
  private selectedImageReader: FileReader;

  public selectedVideo: File | null = null;
  public selectedVideoSource: string | ArrayBuffer | null = null;
  private selectedVideoReader: FileReader;

  constructor(
    private watchablesStore: Store<WatchablesState>,
    private genresStore: Store<GenresState>,
    private characteristicsStore: Store<CharacteristicsState>
  ) {
    this.selectedImageReader = new FileReader();
    this.selectedImageReader.onload = (e) =>
      (this.selectedImageSource = this.selectedImageReader.result);

    this.selectedVideoReader = new FileReader();
    this.selectedVideoReader.onload = (e) =>
      (this.selectedVideoSource = this.selectedVideoReader.result);

    this.genres$ = this.genresStore.select(genres);
    this.characteristics$ = this.characteristicsStore.select(characteristics);
  }

  ngOnInit(): void {
    this.genresStore.dispatch(getAllGenres({}));
    this.characteristicsStore.dispatch(getAllCharacteristics({}));
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedImage = file;
      this.selectedImageReader.readAsDataURL(file);
    }
  }

  onVideoSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedVideo = file;
      this.selectedVideoReader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedImage || !this.selectedVideo) {
      return;
    }

    const genreIds =
      this.form.get('genres')?.value?.map((it: Genre) => it._id) || [];
    const characteristicIds =
      this.form
        .get('characteristics')
        ?.value?.map((it: Characteristic) => it._id) || [];

    const payload = {
      title: this.form.get('title')?.value!,
      description: this.form.get('description')?.value!,
      year: this.form.get('year')?.value!,
      genreIds,
      characteristicIds,
      image: this.selectedImage,
      video: this.selectedVideo,
    } as AddWatchablePayload;

    this.watchablesStore.dispatch(addWatchable({ payload }));
  }

  onCancel(): void {}
}
