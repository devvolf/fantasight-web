import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';
import { AddCharacteristic } from '../../../shared/models/characteristic/add-characteristic.model';
import { EditCharacteristic } from '../../../shared/models/characteristic/edit-characteristic.model';

@Injectable({
  providedIn: 'root',
})
export class CharacteristicsService {
  private characteristicsUrl = `${environment.API_URL}/watchables/characteristics`;

  constructor(private httpClient: HttpClient) {}

  public getAll(searchText?: string): Observable<any> {
    const url = `${this.characteristicsUrl}`;

    if (searchText) {
      const searchTextUrl = `${url}?searchText=${searchText}`;
      return this.httpClient.get(searchTextUrl);
    }
    return this.httpClient.get(url);
  }

  public add(payload: AddCharacteristic): Observable<any> {
    const url = `${this.characteristicsUrl}`;
    return this.httpClient.post(url, payload);
  }

  public edit(payload: EditCharacteristic): Observable<any> {
    const { id } = payload;
    const url = `${this.characteristicsUrl}/${id}`;
    return this.httpClient.put(url, payload);
  }

  public delete(id: string): Observable<any> {
    const url = `${this.characteristicsUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
