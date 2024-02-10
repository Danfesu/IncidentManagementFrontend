import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { ActionExecuted } from '../interfaces/ActionExecuted.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionExecutedService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getActionsExecuted(): Observable<ActionExecuted[]>{
    return this.httpClient.get<ActionExecuted[]>(`${this.baseUrl}/fetchAllActionExecuted`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error ocurred', error);
    return throwError(() => error.message || error);
  }

}
