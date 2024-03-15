import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://goodread-mean-iti-backendpart-3.onrender.com/admin';
//https://goodread-mean-iti-backendpart-2.onrender.com
  constructor(private http: HttpClient) { }

  addAdmin(adminData: any , token:string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http.post<any>(`${this.apiUrl}/`, adminData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error); // Using throwError function
  }
}
