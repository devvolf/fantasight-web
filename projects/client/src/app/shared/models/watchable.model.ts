export enum WatchableType {
  FILM = 'Film',
  SERIE = 'Serie',
}

export interface Genre {
  _id: string;
  name: string;
  description?: string;
}

export interface Characteristic {
  _id: string;
  name: string;
  description?: string;
}

export interface Watchable {
  _id: string;
  title: string;
  description: string;
  year: number;
  posterUrl: string;
  genres: Genre[];
  characteristics: Characteristic[];
  type: WatchableType;
}

export interface Film extends Watchable {
  streamUrl: string;
}

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
