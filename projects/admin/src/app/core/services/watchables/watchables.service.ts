import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchablesService {
  private url = `${environment.API_URL}/watchables`;

  constructor(private httpClient: HttpClient) {}

  public getAll(searchText?: string): Observable<any> {
    const url = `${this.url}`;

    if (searchText) {
      const searchTextUrl = `${url}?searchText=${searchText}`;
      return this.httpClient.get(searchTextUrl);
    }
    return this.httpClient.get(url);
  }

  public addFilm(payload: any): Observable<any> {
    const url = `${this.url}/films`;

    return this.httpClient.post(url, payload);
  }

  public editFilm(payload: any): Observable<any> {
    const { id } = payload;
    const url = `${this.url}/films/${id}`;

    return this.httpClient.put(url, payload);
  }

  public addSerie(payload: any): Observable<any> {
    const url = `${this.url}/series`;

    return this.httpClient.post(url, payload);
  }

  public delete(id: string): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.httpClient.delete(url);
  }
}
