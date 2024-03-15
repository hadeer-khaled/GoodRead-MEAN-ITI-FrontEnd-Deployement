import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { LogedNavComponent } from '../loged-nav/loged-nav.component';

@Component({
  selector: 'app-admin-control-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AdminNavbarComponent,
    LogedNavComponent,
  ],
  templateUrl: './admin-control-page.component.html',
  styleUrl: './admin-control-page.component.css',
})
export class AdminControlPageComponent {}
