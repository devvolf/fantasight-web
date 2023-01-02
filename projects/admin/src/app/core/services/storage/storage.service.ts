import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private url = `${environment.API_URL}/storage`;

  constructor(private httpClient: HttpClient) {}

  uploadImages(files: File[]): Observable<any> {
    const url = `${this.url}/images`;
    const formData = new FormData();
    files.forEach((it) => formData.append('files', it));

    return this.httpClient.post(url, formData);
  }

  uploadVideos(files: File[]): Observable<any> {
    const url = `${this.url}/videos`;
    const formData = new FormData();
    files.forEach((it) => formData.append('files', it));

    return this.httpClient.post(url, formData);
  }
}
