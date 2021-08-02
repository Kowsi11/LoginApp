import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (user) {
      //logged in return true
      return true;
    }
    //not logged in return false and redirect
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
