import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  NgbDropdownModule,
  NgbRating,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from '../../../../services/author.service';
import { BookService } from '../../../../services/book.service';
import { StorageService } from '../../../../services/storage-service.service';
import { UserNavBarComponent } from '../../user-nav-bar/user-nav-bar.component';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [
    UserNavBarComponent,
    RouterLink,
    NgbDropdownModule,
    NgbRatingModule,
  ],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css',
})
export class AuthorDetailsComponent {
  userRating: number = 3;
  shelve: string = 'want to read';
  averageRating?: number;
  readonly = true;
  author: any;
  books: any[] = [];
  @Input() id: string = '';
  name?: string = '';
  token: string = '';

  constructor(
    private http: AuthorService,
    private bookService: BookService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.http.getAuthorById(this.id).subscribe(
      (data: any) => {
        this.author = data.authorDetails[0].author;
        let dob = new Date(this.author.dob);
        let newDate =
          dob.getFullYear() + '/' + (dob.getMonth() + 1) + '/' + dob.getDate();
        this.author.dob = newDate;
        console.log(data);
        this.books = data.authorBooks;
        console.log('author books', data.authorBooks);
        console.log('bookID', this.books[0]._id);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  ///////////////////get rate form user books array/////////////////////
  getRating(books: any[], bookId: string): number | undefined {
    const foundBook = books.find((book) => book.idOfBook === bookId);
    return foundBook ? foundBook.rating : undefined;
  }
  //////////////////updateBookShelve//////////////////////
  onDropdownItemClicked(id: string, value: string) {
    const book = this.books.find((book) => book._id === id);
    if (book) {
      book._id = id;
    }
    this.shelve = value;
    console.log('Selected value:', value);
    console.log('dropId', id);
    this.token = this.storageService.getItem('token') || '';
    this.bookService.updateBookShelve(id, value, this.token).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  //////////////////updateBookRating//////////////////////
  onRatingChange(id: string, rating: number) {
    this.userRating = rating;
    const book = this.books.find((book) => book._id === id);
    if (book) {
      book._id = id;
    }
    console.log(this.userRating);
    this.token = this.storageService.getItem('token') || '';
    this.bookService
      .updateBookRating(id, this.userRating, this.token)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }
  calculateAverageRating(totalRating: number, countOfRating: number): number {
    if (countOfRating === 0) {
      return 0;
    }

    return Number(totalRating) / Number(countOfRating);
  }
}
