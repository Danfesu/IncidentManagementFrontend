import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Incident } from '../interfaces/Incident.interface';
import { DataItem } from '../interfaces/Report.interface';

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

  saveIncident(incident:Incident):Observable<Incident>{
    return this.httpClient.post<Incident>(`${this.baseUrl}/saveIncident`, incident)
      .pipe(
        catchError((error) => {
          console.log('Error al obtener datos:', error.message);
          return throwError(error);
        })
      );
  }

  getSolutionTemplate(id: number): Observable<string>{
    return this.httpClient.get(`${this.baseUrl}/fetchSolutionTemplate/${id}`, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener datos:', error.message);
          return throwError(error);
        })
      );
  }

  private handleError(error: any) {
    console.error('An error ocurred', error);
    return throwError(() => error.message || error);
  }

  getAmountIncidentsPerDay(startDate:string, endDate:string): Observable<[ [string, number] ]>{
    return this.httpClient.get<[ [string, number] ]>(`${this.baseUrl}/fetchAmountIncidentsPerDay?startDate=${startDate}&endDate=${endDate}`);
  }

  getAmountIncidentsPerApp(startDate:string, endDate:string): Observable<[ [string, number] ]>{
    return this.httpClient.get<[ [string, number] ]>(`${this.baseUrl}/fetchAmountIncidentsPerApp?startDate=${startDate}&endDate=${endDate}`);
  }

}
