import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable, catchError, throwError } from 'rxjs';
import { CauseError } from '../interfaces/CauseError.interface';

@Injectable({
  providedIn: 'root'
})
export class CauseErrorService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getCauseErrors(): Observable<CauseError[]>{
    return this.httpClient.get<CauseError[]>(`${this.baseUrl}/fetchAllCauseError`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error ocurred', error);
    return throwError(() => error.message || error);
  }

}
