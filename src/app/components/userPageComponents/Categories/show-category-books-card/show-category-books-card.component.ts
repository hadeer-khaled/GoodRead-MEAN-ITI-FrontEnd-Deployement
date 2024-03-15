import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../../services/category.service.js';
import { UserNavBarComponent } from '../../user-nav-bar/user-nav-bar.component.js';
import { StorageService } from '../../../../services/storage-service.service.js';
@Component({
  selector: 'app-show-category-books-card',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgbPaginationModule,
    UserNavBarComponent,
    UserNavBarComponent,
  ],
  templateUrl: './show-category-books-card.component.html',
  styleUrl: './show-category-books-card.component.css',
})
export class ShowCategoryBooksCardComponent {
  @Input() id: string = '';
  categoryName!: string;
  books: any[] = [];
  token: string = '';
  pageSize = 4;
  page = 1;
  booksCount!: number;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getCategoryBooks();
  }

  onPageChange() {
    this.getCategoryBooks();
  }

  getCategoryBooks() {
    this.token = this.storageService.getItem('token') || '';
    this.categoryService
      .getCategoryById(this.id, this.page, this.pageSize, this.token)
      .subscribe(
        (data: any) => {
          console.log('get data : ', data);
          console.log('data.categories', data.categories);
          console.log('data.categories.booksCount', data.categories.booksCount);
          this.categoryName = data.categories.categoryName;
          this.booksCount = data.categories.booksCount;
          this.books = data.categories.paginatedBooks;
          this.router.navigate([
            'category-details',
            this.id,
            this.page,
            data.categories.paginatedBooks.length,
          ]);
        },
        (error) => {
          console.error('Error fetching category details:', error);
        }
      );
  }
}
