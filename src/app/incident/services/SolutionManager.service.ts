import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { SolutionManager } from '../interfaces/solutionManager.interface';

@Injectable({
  providedIn: 'root'
})
export class SolutionManagerService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getSolutionManagers(): Observable<SolutionManager[]>{
    return this.httpClient.get<SolutionManager[]>(`${this.baseUrl}/fetchAllSolutionManager`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error ocurred', error);
    return throwError(() => error.message || error);
  }

}
