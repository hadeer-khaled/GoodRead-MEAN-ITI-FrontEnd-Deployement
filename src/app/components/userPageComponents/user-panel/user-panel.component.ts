import { Component } from '@angular/core';
import { UserSideNavComponent } from '../Home/user-side-nav/user-side-nav.component';
import { UserBooksComponent } from '../Home/user-books/user-books.component';
import { UserNavBarComponent } from '../user-nav-bar/user-nav-bar.component';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [UserSideNavComponent, UserBooksComponent, UserNavBarComponent],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css',
})
export class UserPanelComponent {}
