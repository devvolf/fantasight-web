import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable, tap } from 'rxjs';
import { AddGenre } from '../../../shared/models/add-genre.model';
import { EditGenre } from '../../../shared/models/edit-genre.model';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private genresUrl = `${environment.API_URL}/watchables/genres`;

  constructor(private httpClient: HttpClient) {}

  public getAll(searchText?: string): Observable<any> {
    const url = `${this.genresUrl}`;

    if (searchText) {
      const searchTextUrl = `${url}?searchText=${searchText}`;
      return this.httpClient.get(searchTextUrl);
    }
    return this.httpClient.get(url);
  }

  public add(payload: AddGenre): Observable<any> {
    const url = `${this.genresUrl}`;
    return this.httpClient.post(url, payload);
  }

  public edit(payload: EditGenre): Observable<any> {
    const { id } = payload;
    const url = `${this.genresUrl}/${id}`;
    return this.httpClient.put(url, payload);
  }

  public delete(id: string): Observable<any> {
    const url = `${this.genresUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
