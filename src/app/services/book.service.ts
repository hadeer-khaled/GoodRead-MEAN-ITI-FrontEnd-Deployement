import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://goodread-mean-iti-backendpart-3.onrender.com/books';
  shelve: string = 'all';

  constructor(private http: HttpClient) {}

  // method to get all books  //book?pageNum
  getBooks(): Observable<any[]> {
    // const headers = new HttpHeaders().set('token', token);
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }
  getUserBooks(queryParams: any, token:string): Observable<any[]> {
    const headers = new HttpHeaders().set('token', token); 
    return this.http.get<any[]>(`${this.apiUrl}/pagination`, { headers, params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }
  getBooksPagination(pageNum: number = 1): Observable<any[]> {
    // const headers = new HttpHeaders().set('token', token);
    const params = new HttpParams().set('pageNum', pageNum.toString());
    return this.http
      .get<any[]>(`${this.apiUrl}/pagination`, { params })
      .pipe(catchError(this.handleError));
  }

  // method to create a new book
  createBook(bookData: any,token:string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .post<any>(this.apiUrl, bookData,{ headers})
      .pipe(catchError(this.handleError));
  }

  // // Set Selve
  // setShelve(shelve: string) {
  //   this.shelve = shelve;
  //   console.log('this.shelve', this.shelve);
  // }
  // getShelve() {
  //   return this.shelve;
  // }
  //   // method to get books filtered by shelf
  getBooksFilterByShelf(
    pageNum: number = 1,
    shelve: string = 'all',
    token: string
  ): Observable<any[]> {
    const headers = new HttpHeaders().set('token', token);
    let params = new HttpParams()
      .set('pageNum', pageNum.toString())
      .set('shelve', shelve);

    return (
      this.http
        // .get<any[]>(`${this.apiUrl}/shelf`, { headers, params: queryParams })
        .get<any[]>(`${this.apiUrl}/shelve`, { headers, params })
        .pipe(catchError(this.handleError))
    );
  }

  private shelveSubject = new BehaviorSubject<string>('all');
  shelve$ = this.shelveSubject.asObservable();

  setShelve(shelve: string) {
    this.shelveSubject.next(shelve);
    console.log('this.shelve', this.shelveSubject.value);
  }

  getShelve() {
    return this.shelve$;
  }

  // ------------------------------------------------------------------------------------------------------- \\

  // method to get popular books
  getPopularBooks(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/popular`)
      .pipe(catchError(this.handleError));
  }
 
  // get book reviews
  getBoookReviews(bookId: string, token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
    .get<any>(`${this.apiUrl}/${bookId}/reviews`, { headers })
    .pipe(catchError(this.handleError));
  }
  // method to get a specific book by ID
  getBookById(bookId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .get<any>(`${this.apiUrl}/${bookId}`, { headers })
      .pipe(catchError(this.handleError));
  }
  getBookByIdUser(bookId: string, token:string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<any>(`${this.apiUrl}/${bookId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  // method to update a book
  updateBook(bookId: number, bookData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .patch<any>(`${this.apiUrl}/${bookId}`, bookData, { headers })
      .pipe(catchError(this.handleError));
  }
  // method to update a book Rating
  updateBookRating(
    bookId: string,
    rating: number,
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    const params = new HttpParams().set('rate', rating.toString());
    return this.http
      .patch<any>(`${this.apiUrl}/${bookId}/rating`, null, { headers, params })
      .pipe(catchError(this.handleError));
  }
  
  // method to delete a book
  deleteBook(bookId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .delete<any>(`${this.apiUrl}/${bookId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // method to handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
  // method to update a book
  updateBookShelve(
    bookId: string,
    shelve: any,
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    const params = new HttpParams().set('shelve', shelve);
    return this.http
      .patch<any>(`${this.apiUrl}/${bookId}/shelve`, null, { headers, params })
      .pipe(catchError(this.handleError));
  }
  //method make review for book made by specific user 
  createReview(bookId: string, reviewContent: any, token: string): Observable<any> {
    console.log('here in create review');
    const headers = new HttpHeaders().set('token', token);
    const reviewData = { content: reviewContent };
    console.log(`${this.apiUrl}/${bookId}/review`);
    console.log(bookId);
    return this.http.post<any>(`${this.apiUrl}/${bookId}/review`, reviewData, { headers })
           .pipe(catchError(this.handleError));
  }


}

/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://goodread-mean-iti-backendpart-3.onrender.com/books';

  constructor(private http: HttpClient) { }

  // method to get all books     // /books?pageNum=1
  getBooks(queryParams: any): Observable<any[]> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN'); 
    return this.http.get<any[]>(this.apiUrl, { headers, params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  // method to get popular books // /books/popular?pageNum=1
  getPopularBooks(): Observable<any[]> {
    //no need for authentication every one can see it 
    return this.http.get<any[]>(`${this.apiUrl}/popular`, { headers, params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  // method to get books filter by shelf
  getBooksFilterByShelf(queryParams: any): Observable<any[]> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN');
    return this.http.get<any[]>(`${this.apiUrl}/shelf`, { headers, params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  // method to get a specific book by ID
  getBookById(bookId: string): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN');
    return this.http.get<any>(`${this.apiUrl}/${bookId}`, { headers, params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  // method to create a new book
  createBook(bookData: any): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN');
    return this.http.post<any>(this.apiUrl, bookData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // method to update a book
  updateBook(bookId: string, bookData: any): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN'); 
    return this.http.patch<any>(`${this.apiUrl}/${bookId}`, bookData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // method to delete a book
  deleteBook(bookId: string): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN');
    return this.http.delete<any>(`${this.apiUrl}/${bookId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // method to handle errors
  private handleError(error: any) {
    console.error('An error occurred:', error);
    throw error;
  }
}

*/
