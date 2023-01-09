import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';
import {
  AuthRequest,
  AuthData,
  RegisterRequest,
  ChangePasswordRequest,
} from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.API_URL}/auth`;
  private authStorageKey = 'auth';

  constructor(private httpClient: HttpClient) {}

  public login(authRequest: AuthRequest): Observable<any> {
    const url = `${this.authUrl}/login`;
    return this.httpClient.post(url, authRequest);
  }

  public refreshToken(refreshToken: string): Observable<any> {
    const url = `${this.authUrl}/token`;
    return this.httpClient.post(url, { refreshToken });
  }

  public logout(refreshToken: string): Observable<any> {
    const url = `${this.authUrl}/logout`;
    return this.httpClient.delete(url, { body: { refreshToken } });
  }

  public saveLocalAuth(auth: AuthData): void {
    localStorage.setItem(this.authStorageKey, JSON.stringify(auth));
  }

  public getLocalAuth(): AuthData | null {
    const storageAuthItem = localStorage.getItem(this.authStorageKey);

    if (!storageAuthItem) {
      return null;
    }

    return JSON.parse(storageAuthItem);
  }

  public clearLocalAuth(): void {
    localStorage.removeItem(this.authStorageKey);
  }

  public register(request: RegisterRequest): Observable<any> {
    const url = `${this.authUrl}/register`;
    return this.httpClient.post(url, request);
  }

  public changePassword(request: ChangePasswordRequest): Observable<any> {
    const url = `${this.authUrl}/change-password`;
    return this.httpClient.post(url, request);
  }
}
