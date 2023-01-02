import { Watchable } from '../watchable.model';

export interface Serie extends Watchable {
  episodes: SerieEpisode[];
}

export interface SerieEpisode {
  _id: string;
  title: string;
  description: string;
  seasonIndex: number;
  posterUrl: string;
  streamUrl: string;
}

export interface SeriePayload {
  id?: string;
  title: string;
  description: string;
  year: string;
  genreIds: string[];
  characteristicIds: string[];
  posterImage: File;
  episodes: SerieEpisodePayload[];
}

export interface SerieEpisodePayload {
  id?: string;
  title: string;
  description: string;
  seasonIndex: number;
  posterImage: File;
  video: File;
}
