import { Characteristic } from '../characteristic/characteristic.model';
import { Genre } from '../genre/genre.model';

export enum WatchableType {
  FILM = 'Film',
  SERIE = 'Serie',
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
