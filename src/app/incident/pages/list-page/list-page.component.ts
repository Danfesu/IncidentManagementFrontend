import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Application } from '../../interfaces/Application.interface';
import { ApplicationService } from '../../services/Application.service';
import { Observable } from 'rxjs';
import { ActionExecuted } from '../../interfaces/ActionExecuted.interface';
import { ActionExecutedService } from '../../services/ActionExecuted.service';
import { CauseError } from '../../interfaces/CauseError.interface';
import { CauseErrorService } from '../../services/CauseError.service';
import { StateRaizal } from '../../interfaces/StateRaizal.interface';
import { StateRaizalService } from '../../services/StateRaizal.service';
import { SolutionManager } from '../../interfaces/solutionManager.interface';
import { SolutionManagerService } from '../../services/SolutionManager.service';
import { Incident } from '../../interfaces/Incident.interface';
import { IncidentService } from '../../services/Incident.service';
import { AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilidadService } from '../../../shared/services/utilidad.service';
import { MaterialModule } from 'src/app/material/material.module';


@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: `./list-page.component.html`,
  styleUrls: ['./list-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent implements OnInit, AfterViewInit{
  
  columnasTabla: string[] = [
    "codigo", "aplicacion", "diagnostico", "solucion", "analista", "acciones"
  ]

  dataListaIncidentes!: MatTableDataSource<Incident>;

  applications$!: Observable<Application[]>;

  actionExecuteds: ActionExecuted[] = [];

  causeErrors$!: Observable<CauseError[]>;

  stateRaizals$!: Observable<StateRaizal[]>;

  solutionManagers$!: Observable<SolutionManager[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Incidents$!: Observable<Incident[]>;
  
  constructor(private applicationService:ApplicationService,
              private actionExecutedService:ActionExecutedService,
              private causeErrorService: CauseErrorService,
              private stateRaizalService: StateRaizalService,
              private solutionManagerService: SolutionManagerService,
              private incidentService: IncidentService,
              private utilidadService: UtilidadService){}


  ngAfterViewInit(): void {
    //this.dataListaIncidentes.paginator = this.paginator;
  }

  getIncidents(){
    this.Incidents$ = this.incidentService.getIncidents();
    this.Incidents$.subscribe( (incidents: Incident[]) => {
      if(incidents.length > 0){
        this.dataListaIncidentes = new MatTableDataSource<Incident>(incidents);
        this.dataListaIncidentes.paginator = this.paginator;
      }else{
        this.utilidadService.mostrarAlerta("No se encontraron datos","Oops!");
      }
    })
  }

  ngOnInit(): void {
    this.getIncidents();
    this.applications$ = this.applicationService.getApplications();
    this.actionExecutedService.getActionsExecuted().subscribe( actionExecuteds => this.actionExecuteds = actionExecuteds);
    this.stateRaizals$ = this.stateRaizalService.getStateRaizals();
    this.causeErrors$ = this.causeErrorService.getCauseErrors();
    this.solutionManagers$ = this.solutionManagerService.getSolutionManagers();
  }

  aplicarFiltroTabla(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaIncidentes.filter = filterValue.trim().toLowerCase();
  }

  copyToClipboard(id: number): void {
    this.incidentService.getSolutionTemplate(id).subscribe( solutionTemplate => {
      navigator.clipboard.writeText(solutionTemplate)
      .then(()=>{
        this.utilidadService.mostrarAlerta("La plantilla de solucion se ha copiado en el portapapeles","Exito!");
      })
      .catch(err => {
        this.utilidadService.mostrarAlerta( err ,"Error :(");
        throw err;
      });
    });
    
  }



}
