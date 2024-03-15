import { Component } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbDropdownModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserNavBarComponent } from '../../user-nav-bar/user-nav-bar.component';
import { StorageService } from '../../../../services/storage-service.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user-books',
  standalone: true,
  imports: [
    NgbRatingModule,
    NgbPaginationModule,
    FormsModule,
    CommonModule,
    NgbDropdownModule,
    UserNavBarComponent,
    TableModule,
  ],
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.css',
})
export class UserBooksComponent {
  books!: Array<any>;
  userBooks$!: any;
  shelve!: string;
  selected = 1;
  readonly = true;

  shelveOptions = ['read', 'reading', 'want'];
  selectedShelve: string | null = null;
  pageSize = 2;
  page = 1;
  booksLength!: number;

  constructor(
    private bookService: BookService,
    private storageService: StorageService
  ) {}
  token = this.storageService.getItem('token') || '';

  ngOnInit(): void {
    // ====================== Try New one ================
    this.bookService.getShelve().subscribe((shelve) => {
      this.shelve = shelve;
      this.getUsersBooks(shelve);
    });
  }

  // ================================ Get Books  filtered by shelve =============== \\

  getUsersBooks(shelve: string) {
    this.bookService
      .getBooksFilterByShelf(this.page, shelve, this.token)
      .subscribe(
        (response: any) => {
          console.log('Subscribe response', response);
          this.books = response.books;
          console.log('this.books', this.books);
          this.booksLength = response.count;
          console.log('this.booksLength', this.booksLength);
          console.log('Inside book component, Selected ===> ', shelve);
        },
        (error: any) => {
          console.error('Error getting books:', error);
        }
      );
  }
  onPageChange() {
    this.bookService.getShelve().subscribe((shelve) => {
      this.shelve = shelve;
      // this.selectedShelve = shelve;
      this.getUsersBooks(shelve);
    });
  }
  calculateAverageRating(totalRating: number, countOfRating: number): number {
    if (countOfRating === 0) {
      return 0;
    }

    return Number(totalRating) / Number(countOfRating);
  }

  onDropdownItemClicked(bookId: string, value: string) {
    // update the sheleve in db
    // console.log(`For Book: ${bookId} the mew Selected Shelve: ${value}`);
    this.selectedShelve = value;
    this.token = this.storageService.getItem('token') || '';
    this.bookService.updateBookShelve(bookId, value, this.token).subscribe(
      (data) => {
        console.log(data);
        this.getUsersBooks(this.shelve);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}
