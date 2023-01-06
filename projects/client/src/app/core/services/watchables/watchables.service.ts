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
}
