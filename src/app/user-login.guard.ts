import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { StorageService } from './services/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService,
    private storageService: StorageService
) {}

  UserLogged = this.storageService.getItem('UserLogged')

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isUserLoggedIn() ) {
      return true;
    } else {
      this.storageService.removeItem('token')
      this.storageService.removeItem('UserLogged')
      this.storageService.removeItem('loggedUser');
      this.storageService.removeItem('role');
      this.UserLogged = null
      return this.router.parseUrl('/');
    }
  }
}

