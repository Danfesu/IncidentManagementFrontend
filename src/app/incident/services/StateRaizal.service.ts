import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { StateRaizal } from '../interfaces/StateRaizal.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateRaizalService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getStateRaizals(): Observable<StateRaizal[]>{
    return this.httpClient.get<StateRaizal[]>(`${this.baseUrl}/fetchAllStateRaizal`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error ocurred', error);
    return throwError(() => error.message || error);
  }

}
