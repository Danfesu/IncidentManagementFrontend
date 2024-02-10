import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Application } from '../interfaces/Application.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getApplications(): Observable<Application[]>{
    return this.httpClient.get<Application[]>(`${this.baseUrl}/fetchAllApplication`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error ocurred', error);
    return throwError(() => error.message || error);
  }

}
