import { Injectable } from '@angular/core';
import { StorageService } from './services/storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService
    ) { }
  role = this.storageService.getItem('role')
  isAdminLoggedIn(): boolean {
    return this.role === 'admin'
  }
  isUserLoggedIn(): boolean {
    return this.role === 'user'
  }
  
}

