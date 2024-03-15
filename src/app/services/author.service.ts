import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'https://goodread-mean-iti-backendpart-3.onrender.com/authors';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<any[]> {
    // const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN');
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createAuthor(authorData: any , token:string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .post<any>(this.apiUrl, authorData, { headers })
      .pipe(catchError(this.handleError));
  }

  getPopularAuthors(): Observable<any[]> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN');
    return this.http
      .get<any[]>(`${this.apiUrl}/popular`, { headers })
      .pipe(catchError(this.handleError));
  }

  getAuthorById(authorId: string): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN');
    return this.http
      .get<any>(`${this.apiUrl}/${authorId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  updateAuthor(authorId: string , authorData: any , token : string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .patch<any>(`${this.apiUrl}/${authorId}`, authorData, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteAuthor(authorId: string, token : string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .delete<any>(`${this.apiUrl}/${authorId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
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
export class AuthorService {
  private apiUrl = 'https://goodread-mean-iti-backendpart-3.onrender.com/authors'; 

  constructor(private http: HttpClient) { }
  
  getAuthors(queryParams: any): Observable<any[]> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN'); // Define headers here
    return this.http.get<any[]>(this.apiUrl, { headers, params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  getPopularAuthors(): Observable<any[]> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN'); // Define headers here
    return this.http.get<any[]>(`${this.apiUrl}/popular`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAuthorById(authorId: string): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN'); // Define headers here
    return this.http.get<any>(`${this.apiUrl}/${authorId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  createAuthor(authorData: any): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN'); // Define headers here
    return this.http.post<any>(this.apiUrl, authorData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAuthor(authorId: string, authorData: any): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN'); // Define headers here
    return this.http.patch<any>(`${this.apiUrl}/${authorId}`, authorData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAuthor(authorId: string): Observable<any> {
    const headers = new HttpHeaders().set('token', 'YOUR_AUTH_TOKEN'); // Define headers here
    return this.http.delete<any>(`${this.apiUrl}/${authorId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    throw error;
  }
}


*/
