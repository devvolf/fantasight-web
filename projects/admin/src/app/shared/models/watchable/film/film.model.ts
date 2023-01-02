import { Watchable } from '../watchable.model';

export interface Film extends Watchable {
  streamUrl: string;
}

export interface FilmPayload {
  id?: string;
  title: string;
  description: string;
  year: string;
  genreIds: string[];
  characteristicIds: string[];
  posterImage: File;
  video: File;
}
