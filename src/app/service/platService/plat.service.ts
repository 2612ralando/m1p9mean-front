import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Plat } from 'src/app/model/plat';
@Injectable({
  providedIn: 'root',
})
export class PlatService {
  baseUri: string = 'https://m1p9mean-orlando-back.herokuapp.com/plat';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  plats: Plat[]=[];
  constructor(private http: HttpClient) {}
  // Create
  createPlat(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  // Get all plats
  getPlats() {
    return this.http.get(`${this.baseUri}`);
  }
  // Get plat
  getPlat(id:string | null): Observable<Plat[]> {
    let url = `${this.baseUri}/read/${id}`;
    console.log("url =" +  url);
    return this.http.get<Plat[]>(url);
  }



  // Update plat
  updatePlat(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  // Delete plat
  deletePlat(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}