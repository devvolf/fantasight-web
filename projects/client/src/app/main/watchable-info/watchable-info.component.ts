import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { VideoPlayerComponent } from '../../shared/components/video-player/video-player.component';
import {
  Film,
  Serie,
  SerieEpisode,
  Watchable,
  WatchableType,
} from '../../shared/models/watchable.model';

@Component({
  selector: 'app-watchable-info',
  templateUrl: './watchable-info.component.html',
  styleUrls: ['./watchable-info.component.scss'],
})
export class WatchableInfoComponent implements OnInit {
  // private orderedEpisodes: SerieEpisode[][] = [];
  private orderedEpisodes: Map<number, SerieEpisode[]> = new Map();
  public selectedSeasonKey = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private watchable: Watchable,
    private dialog: MatDialog
  ) {
    if (this.isSerie) {
      this.fillSeasons();
    }
  }

  fillSeasons(): void {
    (this.watchable as Serie).episodes.forEach((it) => {
      if (it.seasonIndex <= this.orderedEpisodes.size) {
        this.orderedEpisodes.get(it.seasonIndex)?.push(it);
        return;
      }

      this.orderedEpisodes.set(it.seasonIndex, [it]);
    });
  }

  get posterUrl(): string {
    return this.watchable.posterUrl;
  }

  get title(): string {
    return this.watchable.title;
  }

  get year(): string {
    return this.watchable.year.toString();
  }

  get genres(): string {
    return this.watchable.genres.map((it) => it.name).join(', ');
  }

  get characteristics(): string {
    return this.watchable.characteristics.map((it) => it.name).join(', ');
  }

  get description(): string {
    return this.watchable.description;
  }

  get isFilm(): boolean {
    return this.watchable.type === WatchableType.FILM;
  }

  get streamUrl(): string {
    return (this.watchable as Film).streamUrl;
  }

  get isSerie(): boolean {
    return this.watchable.type === WatchableType.SERIE;
  }

  get seasonsKeys(): number[] {
    return [...this.orderedEpisodes.keys()];
  }

  get selectedSeason(): SerieEpisode[] {
    return [...this.orderedEpisodes.get(this.selectedSeasonKey)!.values()];
  }

  ngOnInit(): void {}

  onSeasonKeySelect(event: MatSelectChange): void {
    this.selectedSeasonKey = event.value;
  }

  onPlay(streamUrl: string): void {
    this.dialog.open(VideoPlayerComponent, { data: streamUrl });
  }
}
