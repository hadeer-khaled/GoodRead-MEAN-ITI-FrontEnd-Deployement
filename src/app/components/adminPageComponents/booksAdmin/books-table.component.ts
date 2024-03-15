import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Author } from '../../../interfaces/author';
import { Book } from '../../../interfaces/book';
import { Category } from '../../../interfaces/category';
import { AuthorService } from '../../../services/author.service';
import { BookService } from '../../../services/book.service';
import { CategoryService } from '../../../services/category.service';
import { DataService } from '../../../services/data.service';
import { StorageService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.css',
})
export class BooksTableComponent {
  categories!: Array<Category>;
  authors!: Array<Author>;
  books!: Array<Book>;
  selectedImage!: File;
  editBookForm!: FormGroup;
  id!: number;
  selectedBook!: any;
  bookForm!: FormGroup;
  newBook: any;
  // categoriesArray2: any;
  bookedit: any;
  token: string = '';

  constructor(
    private router: Router,
    private dataService: DataService,
    // private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private storageService: StorageService
  ) {
    // this.token = localStorage.getItem('token') || '';
    this.token = this.storageService.getItem('token') || '';
    this.bookForm = new FormGroup({
      newBookName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      newBookCategoryID: new FormControl('', [Validators.required]),
      newAuthorID: new FormControl('', [Validators.required]),
      describtion: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });

    this.editBookForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      editbookCategoryID: new FormControl('', [Validators.required]),
      editbookauthorID: new FormControl('', [Validators.required]),
      editdescribtion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllAuthors();
    this.getAllCategories();
  }
  // ================================ Get All Books =============== \\
  getAllBooks() {
    this.bookService.getBooks().subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        this.books = response;
        console.log('this.books', this.books);
        console.log('this.categories', this.categories);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }
  // ================================ Add book =============== \\
  getNewBookName() {
    console.log(this.bookForm);
    this.newBook = {
      title: this.bookForm.value.newBookName,
      category: this.bookForm.value.newBookCategoryID,
      author: this.bookForm.value.newAuthorID,
      description: this.bookForm.value.describtion,
    };
    console.log('this.newBook: ', this.newBook);
    const formData = new FormData();
    formData.append('title', this.bookForm.value.newBookName);
    formData.append('category', this.bookForm.value.newBookCategoryID);
    formData.append('author', this.bookForm.value.newAuthorID);
    formData.append('description', this.bookForm.value.describtion);
    formData.append('image', this.selectedImage);
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    this.bookService.createBook(formData, this.token).subscribe(
      // this.bookService.createBook(formData).subscribe(
      (response) => {
        console.log('Book added successfully:', response);

        this.getAllBooks();
        window.location.reload();
      },
      (error) => {
        console.error('Error adding Book:', error);
      }
    );
  }
  // ================================ Get All Authors =================== \\

  getAllAuthors() {
    this.authorService.getAuthors().subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        this.authors = response;
        console.log('this.authors', this.authors);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }
  // ================================ Get All Categries =================== \\
  getAllCategories() {
    const pageNum = 1; // Or any page number you want to fetch
    this.categoryService
      .getcategoriesNames()
      .pipe(
        map((data: any) => {
          console.log('data', data);
          let categoriesArray = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              console.log('data[key]', data[key]);
              categoriesArray = data[key];
            }
          }
          return categoriesArray;
        })
      )
      .subscribe(
        (categories) => {
          this.categories = categories;
          console.log('this.categories', this.categories);
        },
        (error) => {
          console.error('Error getting categories:', error);
        }
      );
  }
  onImageSelected(event: any): void {
    // Ensure that event.target is not null before proceeding
    if (event.target) {
      const files: FileList | null = event.target.files;
      if (files && files.length > 0) {
        this.selectedImage = files[0];
        console.log('Selected File:', this.selectedImage);
      }
    }
  }
  // --------------------------- NgBootstrap Code --------------------------- \\
  closeResult = '';
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  // ================================ edit ngModal ================================

  editBook(book: any, editModal: any) {
    console.log('Editing book:', book);
    this.id = book.id;
    console.log(this.id);
    this.editBookForm.patchValue({
      title: book.title,
      editbookCategoryID: book.category._id,
      editbookauthorID: book.author._id,
      editdescribtion: book.description,
    });
    console.log(this.editBookForm);

    this.modalService.open(editModal, { centered: true });
  }
  // ================================ edit  ================================

  updatebook() {
    this.bookedit = {
      title: this.editBookForm.value.title,
      category: this.editBookForm.value.editbookCategoryID,
      author: this.editBookForm.value.editbookauthorID,
      description: this.editBookForm.value.editdescribtion,
    };
    console.log('this.bookedit: ', this.bookedit);
    this.bookService.updateBook(this.id, this.bookedit, this.token).subscribe(
      (response) => {
        console.log('Book updated successfully:', response);
        this.getAllBooks();
      },
      (error) => {
        console.error('Error updating Book:', error);
        alert(`${error.error.error}`);
      }
    );
    this.modalService.dismissAll();
  }

  // ================================ delete ngModal ================================

  deleteBookModal(book: any, content: any) {
    this.id = book.id;
    this.modalService.open(content, { centered: true });
  }

  // ================================ delete  ================================

  deleteBook() {
    this.bookService.deleteBook(this.id, this.token).subscribe(
      (response) => {
        console.log('Book deleted successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting Book:', error);
        alert(`${error.error.error}`);
      }
    );
    this.modalService.dismissAll();
  }
}
