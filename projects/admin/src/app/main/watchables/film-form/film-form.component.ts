import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import { Genre } from '../../../shared/models/genre/genre.model';
import {
  Film,
  FilmPayload,
} from '../../../shared/models/watchable/film/film.model';
import {
  Watchable,
  WatchableType,
} from '../../../shared/models/watchable/watchable.model';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.scss'],
})
export class FilmFormComponent implements OnInit {
  @Input() watchable: Watchable | undefined | null;
  @Input() genres: Genre[] | null = [];
  @Input() characteristics: Characteristic[] | null = [];
  @Output() onSubmit: EventEmitter<FilmPayload> = new EventEmitter();

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    genres: new FormControl([] as Genre[], []),
    characteristics: new FormControl([] as Characteristic[], []),
  });

  public selectedImage: File | null = null;
  public selectedImageSource: string | ArrayBuffer | null = null;
  private selectedImageReader: FileReader;

  public selectedVideo: File | null = null;
  public selectedVideoSource: string | ArrayBuffer | null = null;
  private selectedVideoReader: FileReader;

  constructor() {
    this.selectedImageReader = new FileReader();
    this.selectedImageReader.onload = (e) =>
      (this.selectedImageSource = this.selectedImageReader.result);

    this.selectedVideoReader = new FileReader();
    this.selectedVideoReader.onload = (e) =>
      (this.selectedVideoSource = this.selectedVideoReader.result);
  }

  ngOnInit(): void {
    if (this.watchable) {
      if (this.watchable.type === WatchableType.FILM) {
        const film = this.watchable as Film;

        this.form.setValue({
          title: film.title,
          description: film.description,
          year: film.year.toString(),
          genres: film.genres,
          characteristics: film.characteristics,
        });

        this.selectedImageSource = film.posterUrl;
        this.selectedVideoSource = film.streamUrl;
      }
    }
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

  onSubmitFn(): void {
    if (
      this.form.invalid ||
      !this.selectedImageSource ||
      !this.selectedVideoSource
    ) {
      return;
    }

    const genreIds =
      this.form.get('genres')?.value?.map((it: Genre) => it._id) || [];
    const characteristicIds =
      this.form
        .get('characteristics')
        ?.value?.map((it: Characteristic) => it._id) || [];

    const payload = {
      id: this.watchable?._id,
      title: this.form.get('title')?.value!,
      description: this.form.get('description')?.value!,
      year: this.form.get('year')?.value!,
      genreIds,
      characteristicIds,
      posterImage: this.selectedImage,
      video: this.selectedVideo,
    } as FilmPayload;

    this.onSubmit.emit(payload);
  }
}
