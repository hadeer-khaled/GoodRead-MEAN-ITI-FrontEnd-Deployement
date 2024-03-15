import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://goodread-mean-iti-backendpart-3.onrender.com/users';

  constructor(private http: HttpClient) {}

  // method to register a new user
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, userData).pipe(
      catchError(this.handleError) // Handle error here
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  // method to handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error); // Using throwError function
  }
}
