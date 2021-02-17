import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { APP_ROUTES } from '../../constants/routes/routes.constants';
import { FireAuthService } from '../../services/fire-auth/fire-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public fireAuthService: FireAuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.fireAuthService.isLoggedIn !== true) {
      this.router.navigate([APP_ROUTES.LOGIN.path]);
    }
    return true;
  }
}
