import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-loged-nav',
  standalone: true,
  imports: [],
  templateUrl: './loged-nav.component.html',
  styleUrl: './loged-nav.component.css',
})
export class LogedNavComponent {
  collapsed = true;
  AdminLogged = this.storageService.getItem('AdminLogged');

  constructor(private router: Router, private storageService: StorageService) {}
  logOut() {
    this.storageService.removeItem('token');
    this.storageService.removeItem('AdminLogged');
    this.storageService.removeItem('loggedUser');
    this.storageService.removeItem('role');
    console.log(this.storageService.getItem('AdminLogged'));
    this.AdminLogged = null;
    this.router.navigate(['/']);
  }
}
