import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://goodread-mean-iti-backendpart-3.onrender.com/categories';

  constructor(private http: HttpClient) {}

  // method to add a new category (admin only)
  addCategory(categoryData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .post<any>(`${this.apiUrl}/`, categoryData, { headers })
      .pipe(catchError(this.handleError));
  }

  // method to update a category by ID (admin only)
  updateCategory(
    categoryId: number,
    categoryData: any,
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .patch<any>(`${this.apiUrl}/${categoryId}`, categoryData, { headers })
      .pipe(catchError(this.handleError));
  }

  // method to delete a category by ID (admin only)
  deleteCategory(categoryId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .delete<any>(`${this.apiUrl}/${categoryId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // method to get popular categories (public access)
  getPopularCategories(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/popular`)
      .pipe(catchError(this.handleError));
  }

  // Method to get all categories (public access)
  getAllCategories(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError));
  }
  getcategoriesNames() {
    return this.http.get(`${this.apiUrl}`);
  }

  // getCategoryById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`).pipe();
  // }

  getAllcategoriesNames(categoriesName: string,token:string) {
    const headers = new HttpHeaders().set('token', token);
    return this.http.get(`${this.apiUrl}/${categoriesName}`,{headers});
  }
  getCategoryById(id: string, page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers, params });
  }


  // Method to handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }


}
