import { Injectable } from '@angular/core';
import {Categories} from '../../../Categories.json'
import {Authors} from '../../../Authors.json'
import {Books} from '../../../Books.json'



@Injectable({
  providedIn: 'root' 
})
export class DataService {
categories : any = Categories
authors : any = Authors
books : any = Books
  constructor() { }

  updateCategory(id: number, newName: string): void {
    const index = this.categories.findIndex((category: { id: number; }) => category.id === id);
    if (index !== -1) {
      this.categories[index].categoryName = newName;
    }
  }

  updateBook(bookId: number, updatedBookData: any): boolean {
    console.log('Updating book:', bookId, updatedBookData);

    const index = this.books.findIndex((book: { bookID: number; }) => book.bookID === bookId);
    if (index !== -1) {
      const isValidAuthorID = this.authors.some((author: { authorID: any; }) => author.authorID === updatedBookData.authorID);
      const isValidCategoryID = this.categories.some((category: { id: any; }) => category.id === updatedBookData.categoryID);

      if (!isValidAuthorID || !isValidCategoryID) {

        console.error('Invalid authorID or categoryID.');
        return false; 
      } else {
        this.books[index].title = updatedBookData.title;
        this.books[index].categoryID = updatedBookData.categoryID;
        this.books[index].authorID = updatedBookData.authorID;
        return true; 
      }
    } else {
      console.error('Book not found.');
      return false; 
    }
  }
}

