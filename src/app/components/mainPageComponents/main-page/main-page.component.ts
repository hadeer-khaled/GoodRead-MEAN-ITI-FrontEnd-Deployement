import { Component } from '@angular/core';

import { LandingComponent } from '../landing/landing.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { PopularBooksComponent } from '../popular-books/popular-books.component';
import { PopularAuthorsComponent } from '../popular-authors/popular-authors.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NavBarComponent,
    LandingComponent,
    PopularBooksComponent,
    PopularAuthorsComponent,
    FooterComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
