import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';
import { AuthRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.API_URL}/auth`;

  constructor(private httpClient: HttpClient) {}

  public login(authRequest: AuthRequest): Observable<any> {
    const url = `${this.authUrl}/login`;
    return this.httpClient.post(url, authRequest);
  }
}
