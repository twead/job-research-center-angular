import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  role: string;
  role2: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const expectedRole = route.data.expectedRole;
      this.role = this.tokenService.IsAdmin ? 'admin' : 'employee';
      this.role2 = this.tokenService.IsEmployer ? 'employer' : 'employee';
      if (!this.tokenService.isLogged() || expectedRole.indexOf(this.role) < 0 && 
          expectedRole.indexOf(this.role2) < 0) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
}