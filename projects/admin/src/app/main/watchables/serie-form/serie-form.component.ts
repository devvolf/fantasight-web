import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import { Genre } from '../../../shared/models/genre/genre.model';
import {
  Serie,
  SerieEpisodePayload,
  SeriePayload,
} from '../../../shared/models/watchable/serie/serie.model';
import {
  Watchable,
  WatchableType,
} from '../../../shared/models/watchable/watchable.model';
import { SerieEpisodeFormComponent } from './serie-episode-form/serie-episode-form.component';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.scss'],
})
export class SerieFormComponent implements OnInit {
  @Input() watchable: Watchable | null | undefined;
  @Input() genres: Genre[] | null = [];
  @Input() characteristics: Characteristic[] | null = [];
  @Output() onSubmit: EventEmitter<SeriePayload> = new EventEmitter();

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'season',
    'actions',
  ];

  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    genres: new FormControl([] as string[], []),
    characteristics: new FormControl([] as string[], []),
  });

  public episodesSubject: BehaviorSubject<SerieEpisodePayload[]>;

  public selectedImage: File | null = null;
  public selectedImageSource: string | ArrayBuffer | null = null;
  private selectedImageReader: FileReader;

  private subscription: Subscription;

  constructor(public dialog: MatDialog) {
    this.episodesSubject = new BehaviorSubject([] as SerieEpisodePayload[]);
    this.subscription = new Subscription();
    this.selectedImageReader = new FileReader();
    this.selectedImageReader.onload = (e) =>
      (this.selectedImageSource = this.selectedImageReader.result);
  }

  get episodes$(): Observable<SerieEpisodePayload[]> {
    return this.episodesSubject.asObservable();
  }

  ngOnInit(): void {
    if (this.watchable) {
      if (this.watchable.type === WatchableType.SERIE) {
        const serie = this.watchable as Serie;

        this.form.setValue({
          title: serie.title,
          description: serie.description,
          year: serie.year.toString(),
          genres: serie.genres.map((it) => it._id),
          characteristics: serie.characteristics.map((it) => it._id),
        });

        const episodesPayloads = serie.episodes.map(
          (it) =>
            ({
              id: it._id,
              title: it.title,
              description: it.description,
              seasonIndex: it.seasonIndex,
              posterUrl: it.posterUrl,
              streamUrl: it.streamUrl,
            } as SerieEpisodePayload & {
              posterUrl: string;
              streamUrl: string;
            })
        );
        this.selectedImageSource = serie.posterUrl;
        this.episodesSubject.next(episodesPayloads);
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

  onAddEpisode(): void {
    this.subscription.add(
      this.dialog
        .open(SerieEpisodeFormComponent)
        .afterClosed()
        .pipe(
          tap((episode: SerieEpisodePayload) => {
            if (episode) {
              let currentEpisodes = this.episodesSubject.value;
              currentEpisodes.push(episode);
              this.episodesSubject.next(currentEpisodes);
            }
          })
        )
        .subscribe()
    );
  }

  onEditEpisode(episode: SerieEpisodePayload): void {
    this.subscription.add(
      this.dialog
        .open(SerieEpisodeFormComponent, { data: episode })
        .afterClosed()
        .pipe(
          tap((updatedEpisode: SerieEpisodePayload) => {
            if (updatedEpisode) {
              const currentEpisodes = this.episodesSubject.value;
              const index = currentEpisodes.indexOf(episode);

              if (index > -1) {
                const updatedEpisodes = currentEpisodes.filter(
                  (value, valueIndex) => valueIndex !== index
                );
                updatedEpisodes.push(updatedEpisode);
                this.episodesSubject.next(updatedEpisodes);
              }
            }
          })
        )
        .subscribe()
    );
  }

  onDeleteEpisode(episode: SerieEpisodePayload): void {
    const currentEpisodes = this.episodesSubject.value;
    const index = currentEpisodes.indexOf(episode);

    if (index > -1) {
      const updatedEpisodes = currentEpisodes.filter(
        (value, valueIndex) => valueIndex !== index
      );
      this.episodesSubject.next(updatedEpisodes);
    }
  }

  onSubmitFn(): void {
    if (this.form.invalid || !this.selectedImageSource) {
      return;
    }

    const genreIds = this.form.get('genres')?.value;
    const characteristicIds = this.form.get('characteristics')?.value;

    const payload = {
      id: this.watchable?._id,
      title: this.form.get('title')?.value!,
      description: this.form.get('description')?.value!,
      year: this.form.get('year')?.value!,
      genreIds,
      characteristicIds,
      posterImage: this.selectedImage,
      episodes: this.episodesSubject.value,
    } as SeriePayload;

    this.onSubmit.emit(payload);
  }
}
