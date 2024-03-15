import { Component } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
// import { Books } from '../../../../../Books.json';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interfaces/book';
@Component({
  selector: 'app-popular-books',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './popular-books.component.html',
  styleUrl: './popular-books.component.css',
})
export class PopularBooksComponent {
  // books= books;
  books!: Array<Book>;
  constructor(private bookServices: BookService) {
    this.bookServices.getPopularBooks().subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        console.log('this.books', this.books);
        this.books = response;
        console.log('this.books', this.books);
      },
      (error: any) => {
        console.error('Error getting Popular books:', error);
      }
    );
  }
}
