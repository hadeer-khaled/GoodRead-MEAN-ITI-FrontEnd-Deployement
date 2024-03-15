import { Component } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../interfaces/author';
import { AuthorCardComponent } from '../author-card/author-card.component';

@Component({
  selector: 'app-popular-authors',
  standalone: true,
  imports: [AuthorCardComponent],
  templateUrl: './popular-authors.component.html',
  styleUrl: './popular-authors.component.css',
})
export class PopularAuthorsComponent {
  authors!: Array<any>;
  constructor(private authorServices: AuthorService) {
    this.authorServices.getPopularAuthors().subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        this.authors = response;
        console.log('this.authors', this.authors);
      },
      (error: any) => {
        console.error('Error getting Popular books:', error);
      }
    );
  }
}
