import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../interfaces/author';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interfaces/book';
import { StorageService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-user-nav-bar',
  standalone: true,
  imports: [FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './user-nav-bar.component.html',
  styleUrl: './user-nav-bar.component.css',
})
export class UserNavBarComponent {
  constructor(
    private router: Router,
    private authorService: AuthorService,
    private bookService: BookService,
    private storageService: StorageService
  ) {}
  UserLogged = this.storageService.getItem('UserLogged');
  authors: Author[] = [];
  books: Book[] = [];

  query: string = '';
  id: any;

  authorsNames: { id: string; name: string }[] = [];
  booksNames: { id: number; name: string }[] = [];

  ngOnInit() {
    this.getAllAuthors();
    this.getAllBooks();
  }

  getAllAuthors() {
    this.authorService.getAuthors().subscribe(
      (response: any[]) => {
        console.log('Subscribe response', response);
        this.authors = response;
        console.log('this.authors', this.authors);
        this.authorsNames = this.authors.map((author) => ({
          id: author._id,
          name: author.firstName + ' ' + author.lastName,
        }));
        console.log('authorsNames', this.authorsNames);
      },
      (error: any) => {
        console.error('Error getting authors:', error);
      }
    );
  }

  doesAuthorContainQuery(query: string): boolean {
    for (const author of this.authorsNames) {
      if (author.name.toLowerCase().includes(query.toLowerCase())) {
        this.query = author.name;
        console.log(this.authorsNames);
        console.log(this.query);
        return true;
      }
    }
    return false;
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe(
      (response: any[]) => {
        console.log('Subscribe response', response);
        this.books = response;
        console.log('this.books', this.books);
        this.booksNames = this.books.map((book) => ({
          id: book.id,
          name: book.title,
        }));
        console.log('booksNames', this.booksNames);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }

  doesBookContainQuery(query: string): boolean {
    for (const book of this.booksNames) {
      if (book.name.toLowerCase().includes(query.toLowerCase())) {
        this.query = book.name;
        console.log(this.booksNames);
        console.log(this.query);
        return true;
      }
    }
    return false;
  }

  search(id: any, name: string) {
    if (this.query.trim() !== '' && this.doesAuthorContainQuery(this.query)) {
      name = this.query;
      const author = this.authorsNames.find(
        (author) => author.name.toLowerCase() === name.toLowerCase()
      );
      if (author) {
        id = author.id;
        this.router.navigate(['/authors/author', id, name]);
      } else {
        console.error('Author not found');
      }
    }
    if (this.query.trim() !== '' && this.doesBookContainQuery(this.query)) {
      name = this.query;
      const book = this.booksNames.find(
        (book) => book.name.toLowerCase() === name.toLowerCase()
      );
      if (book) {
        id = book.id;
        this.router.navigate(['books/book', id, name]);
      } else {
        console.error('Book not found');
      }
    }
  }

  logOut() {
    this.storageService.removeItem('token');
    this.storageService.removeItem('UserLogged');
    this.storageService.removeItem('loggedUser');
    this.storageService.removeItem('role');
    this.UserLogged = null;
    this.router.navigate(['/']);
  }
}
