import { Component, Input, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { FieldsetModule } from 'primeng/fieldset';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  // FormsModule,
  Validators,
} from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { UserNavBarComponent } from '../../user-nav-bar/user-nav-bar.component';
import { BookService } from '../../../../services/book.service';
import { StorageService } from '../../../../services/storage-service.service';
import { Book } from '../../../../interfaces/book';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    RouterLinkActive,
    NgbDropdownModule,
    NgbRatingModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    UserNavBarComponent,
    FieldsetModule,
    AccordionModule,
    AvatarModule,
    PaginatorModule,
    TagModule,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  userRating: number = 3; // Default rating is 3
  book!: Book;
  shelve: string = 'want to read';
  averageRating?: number;
  readonly = true;
  reviews!: any;
  totalRecords: number = 0;
  first: number = 0; // Index of the first record to be displayed
  rows: number = 5; // Number of rows to display per page
  activeTabIndex!: number;
  private modalService = inject(NgbModal);
  closeResult = '';
  token: string = '';

  @Input() id: string = '';

  reviewForm!: FormGroup;

  constructor(
    private bookService: BookService,
    private storageService: StorageService
  ) {
    this.reviewForm = new FormGroup({
      review: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  ngOnInit(): void {
    this.token = this.storageService.getItem('token') || '';
    const queryParams = { pageNum: 1 };
    console.log(this.id);
    console.log('im am her on init');
    this.bookService.getBookByIdUser(this.id, this.token).subscribe(
      (data) => {
        this.book = data;
        this.bookService.getBoookReviews(this.book._id, this.token).subscribe(
          (data) => {
            this.reviews = data;
            this.reviews = this.reviews.reviews;
            console.log('Reviews', this.reviews);
            this.totalRecords = this.reviews.length;
          },
          (error) => {
            console.error('Error fetching books:', error);
          }
        );
        console.log(this.book);
        console.log("i'm here ");
        if (this.book.countOfRating == 0) {
          this.averageRating = 0;
        } else {
          this.averageRating = this.book.totalRating / this.book.countOfRating;
        }
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
    console.log("i'm here ");
    console.log('im am her on afeer first method init');
    this.bookService.getBoookReviews(this.book._id, this.token).subscribe(
      (data) => {
        this.reviews = data;
        this.reviews = this.reviews.reviews;
        this.totalRecords = this.reviews.length;
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
  onDropdownItemClicked(value: string) {
    // update the sheleve in db
    this.shelve = value;
    console.log('Selected value:', value);
    this.token = this.storageService.getItem('token') || '';
    this.bookService
      .updateBookShelve(this.book._id, value, this.token)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }
  //////////////////updateBookRating//////////////////////
  onRatingChange(rating: number) {
    this.userRating = rating;
    console.log(`the id ${this.book}`);
    console.log(this.userRating);
    this.token = this.storageService.getItem('token') || '';
    this.bookService
      .updateBookRating(this.book._id, this.userRating, this.token)
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

  addNewReview() {
    const reviewContent = this.reviewForm.value.review;
    this.token = this.storageService.getItem('token') || '';
    this.bookService
      .createReview(this.book._id, reviewContent, this.token)
      .subscribe(
        (data) => {
          console.log(data);
          window.location.reload();
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }
  onPageChange(event: any) {
    this.first = event.first; // Update the index of the first record to be displayed
    this.rows = event.rows; // Update the number of rows to display per page
  }
}
