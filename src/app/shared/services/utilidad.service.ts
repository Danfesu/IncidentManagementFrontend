import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncidentService } from '../../incident/services/Incident.service';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar: MatSnackBar,
              private incidentService: IncidentService) { }

  mostrarAlerta(mensaje:string, tipo:string){
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    })
  }

  copyToClipboard(id: number): void {
    this.incidentService.getSolutionTemplate(id).subscribe( solutionTemplate => {
      navigator.clipboard.writeText(solutionTemplate)
      .then(()=>{
        this.mostrarAlerta("La plantilla de solucion se ha copiado en el portapapeles","Exito!");
      })
      .catch(err => {
        this.mostrarAlerta( err ,"Error :(");
        throw err;
      });
    });
  }

}
