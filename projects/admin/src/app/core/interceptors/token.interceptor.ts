import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AuthData } from '../models/auth.model';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.auth.getLocalAuth()?.accessToken;
    const refreshToken = this.auth.getLocalAuth()?.refreshToken;

    if (!accessToken || !refreshToken) {
      this.auth.clearLocalAuth();
      this.router.navigateByUrl('/auth');
    }

    request = request.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && refreshToken) {
            return this.auth.refreshToken(refreshToken).pipe(
              switchMap((response) => {
                const { accessToken } = response;
                const authData = {
                  ...this.auth.getLocalAuth(),
                  accessToken,
                  refreshToken,
                } as AuthData;
                this.auth.saveLocalAuth(authData);
                const newRequest = request.clone({
                  setHeaders: { Authorization: `Bearer ${accessToken}` },
                });
                return next.handle(newRequest);
              }),
              catchError((err) => {
                this.auth.clearLocalAuth();
                this.router.navigateByUrl('/auth');
                return of(err);
              })
            );
          }
          return of(err);
        }
        return of(err);
      })
    );
  }
}
