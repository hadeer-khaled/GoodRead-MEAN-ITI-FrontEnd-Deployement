import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookService } from '../../../../services/book.service';
// import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-side-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterLinkActive],
  templateUrl: './user-side-nav.component.html',
  styleUrl: './user-side-nav.component.css',
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class UserSideNavComponent {
  constructor(
    private bookService: BookService // private cdr: ChangeDetectorRef
  ) {}

  onShelveSelected(shelve: string) {
    this.bookService.setShelve(shelve);
  }
  onButtonClicked(event: Event) {
    // Remove 'clicked' class from all buttons
    const buttons = document.querySelectorAll('.sidenav button');
    buttons.forEach((button) => button.classList.remove('clicked'));

    // Add 'clicked' class to the clicked button
    const clickedButton = event.target as HTMLButtonElement;
    clickedButton.classList.add('clicked');
  }
}
