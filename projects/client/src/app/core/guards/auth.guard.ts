import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private route: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = this.auth.getLocalAuth()?.accessToken;

    if (!token) {
      this.route.navigateByUrl('/auth');
      return of(false);
    }

    return of(true);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.route.navigateByUrl('/auth');
    return of(false);
    const token = this.auth.getLocalAuth()?.accessToken;

    if (!token) {
      this.route.navigateByUrl('/auth');
      return of(false);
    }

    return of(true);
  }
}
