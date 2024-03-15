import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserNavBarComponent } from '../../user-nav-bar/user-nav-bar.component';
import { BookService } from '../../../../services/book.service';
import { StorageService } from '../../../../services/storage-service.service';
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    NgbPaginationModule,
    UserNavBarComponent,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  books!: any[];
  currentPage: number = 1;
  length: number = 0;
  pageSize: number = 2;
  token: string = '';

  constructor(
    private bookService: BookService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    const queryParams = { pageNum: 1 };
    this.token = this.storageService.getItem('token') || '';
    this.bookService.getUserBooks(queryParams, this.token).subscribe(
      (data: any) => {
        this.books = data.books;
        this.length = data.bookCount; // Set the total number of books as the length
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  onPageChange(pageNumber: number): void {
    this.token = this.storageService.getItem('token') || '';
    const queryParams = { pageNum: pageNumber };
    this.bookService.getUserBooks(queryParams, this.token).subscribe(
      (data: any) => {
        this.books = data.books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}
