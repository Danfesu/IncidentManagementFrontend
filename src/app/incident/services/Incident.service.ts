import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Incident } from '../interfaces/Incident.interface';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getIncidents(): Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(`${this.baseUrl}/fetchAllIncidents`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSolutionTemplate(id: number): Observable<string>{
    console.log(id)
    return this.httpClient.get(`${this.baseUrl}/fetchSolutionTemplate/${id}`, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          // Manejar el error aquí
          console.error('Error al obtener datos:', error.message);
          // Puedes lanzar el error nuevamente para que otros suscriptores lo manejen
          return throwError(error);
        })
      );
  }

  private handleError(error: any) {
    console.error('An error ocurred', error);
    return throwError(() => error.message || error);
  }

}
