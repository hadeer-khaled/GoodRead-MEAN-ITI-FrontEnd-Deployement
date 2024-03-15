import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { StorageService } from './services/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService,
    private storageService: StorageService
) {}
  AdminLogged = this.storageService.getItem('AdminLogged')

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isAdminLoggedIn() ) {
      return true;
    } else {
      this.storageService.removeItem('token')
      this.storageService.removeItem('AdminLogged')
      this.storageService.removeItem('loggedUser');
      this.storageService.removeItem('role');
      this.AdminLogged = null
      return this.router.parseUrl('/');
    }
  }
}


