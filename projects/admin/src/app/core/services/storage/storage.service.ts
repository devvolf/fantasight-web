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

  uploadImage(file: File): Observable<any> {
    const url = `${this.url}/images`;
    const formData = new FormData();
    formData.append('file', file);
    
    return this.httpClient.post(url, formData);
  }

  uploadVideo(file: File): Observable<any> {
    const url = `${this.url}/videos`;
    const formData = new FormData();
    formData.append('file', file);
    
    return this.httpClient.post(url, formData);
  }
}
