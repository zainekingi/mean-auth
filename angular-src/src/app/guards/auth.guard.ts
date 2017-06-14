import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate() {
    // logic for the routes.
    if(this.authService.loggedIn()) {
      // user is logged in.
      return true;
    } else {
      // user is not logged in - user to login.
      this.router.navigate(['/login']);
      return false;
    }
  }
}


