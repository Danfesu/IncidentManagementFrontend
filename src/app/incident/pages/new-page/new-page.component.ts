import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../services/Application.service';
import { Application, ClusteredError } from '../../interfaces/Application.interface';
import { CauseError } from '../../interfaces/CauseError.interface';
import { Incident } from '../../interfaces/Incident.interface';
import { StateRaizal } from '../../interfaces/StateRaizal.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { CauseErrorService } from '../../services/CauseError.service';
import { ActionExecuted } from '../../interfaces/ActionExecuted.interface';
import { ActionExecutedService } from '../../services/ActionExecuted.service';
import { StateRaizalService } from '../../services/StateRaizal.service';
import { Analyst, SolutionManager } from '../../interfaces/solutionManager.interface';
import { SolutionManagerService } from '../../services/SolutionManager.service';
import { IncidentService } from '../../services/Incident.service';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDialogComponent } from 'src/app/shared/pages/GeneralDialog/GeneralDialog.component';
import { Router } from '@angular/router';
import { UtilidadService } from '../../../shared/services/utilidad.service';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: `./new-page.component.html`,
  styleUrls: ['./new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPageComponent implements OnInit{

  incident!: Incident;

  applications: Application[] = [];
  clusteredErrors: ClusteredError[] = [];
  causeErrors: CauseError[] = [];
  actionExecuteds: ActionExecuted[] = [];
  stateRaizals: StateRaizal[] = [];
  solutionManagers: SolutionManager[] = [];
  analysts: Analyst[] = [];
  optionConfirmedOperability = [
    {
      value: true,
      option: "SI"
    },
    {
      value: false,
      option: "NO"
    }
  ]

  public myForm: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(6)]],
    applicationId: ['', Validators.required],
    clusteredErrorId: ['', Validators.required],
    newClusteredError: [''],
    causeErrorId: ['', Validators.required],
    actionExecutedId: ['', Validators.required],
    huRaizal: ['', Validators.required],
    stateRaizalId: ['', Validators.required],
    solutionManagerId: ['', Validators.required],
    analyst: ['', Validators.required],
    diagnosis: ['', Validators.required],
    solution: ['', Validators.required],
    confirmedOperability: ['', Validators.required],
    accessOc: ['', Validators.required]
  });

  constructor( private fb: FormBuilder,
               private applicationService:ApplicationService, 
               private causeErrorService:CauseErrorService,
               private actionExecutedService:ActionExecutedService,
               private stateRaizalService: StateRaizalService,
               private solutionManagerService:SolutionManagerService,
               private incidentService: IncidentService,
               private utilidadService: UtilidadService,
               private dialog: MatDialog,
               private router: Router){
                this.newIncident();
               }


  ngOnInit(): void {
    this.getApplications();
    this.causeErrorService.getCauseErrors().subscribe( causes => this.causeErrors = causes);
    this.actionExecutedService.getActionsExecuted().subscribe( actions => this.actionExecuteds = actions);
    this.stateRaizalService.getStateRaizals().subscribe( states => this.stateRaizals = states);
    this.solutionManagerService.getSolutionManagers().subscribe( managers => this.solutionManagers = managers);
  }

  getApplications():void{
    this.applicationService.getApplications().subscribe( applications => {
      this.applications = applications;
    });
  }

  newIncident():void{
    this.incident = {
      id: 0,
      diagnosis: "",
      date: "",
      solution: "",
      confirmed_operability: false,
      access_oc: "",
      application: "",
      hu_raizal: "",
      clusteredError: {
          id: 0,
          description: "",
          application_id: 0
      },
      causeError: {
          id: 0,
          description: ""
      },
      actionExecuted: {
          id: 0,
          description: ""
      },
      analyst: {
          id: 0,
          name: "",
          email: "",
          group_id: 0
      },
      stateRaizal: {
          id: 0,
          type: "0"
      }
    };
  }

  getClusteredError(idApplication: number):void{
    const selectedApplication = this.applications.find(app => app.id === idApplication);
    if (selectedApplication) {
      this.clusteredErrors = selectedApplication.clusteredErrors;
      this.clusteredErrors.push(...[{
        id: 0,
        description: "Otro",
        application_id: idApplication
      }])
    }
  }

  assingValues(){
    this.incident.id = this.myForm.value.id;
    this.incident.diagnosis = this.myForm.value.diagnosis;
    this.incident.date = new Date().toISOString();
    this.incident.solution = this.myForm.value.solution;
    this.incident.confirmed_operability = this.myForm.value.confirmedOperability;
    this.incident.access_oc = this.myForm.value.accessOc;
    this.incident.hu_raizal = this.myForm.value.huRaizal;
    this.incident.application = this.applications.find(app => app.id === this.myForm.value.applicationId)!.name;
    if(this.myForm.value.clusteredErrorId === 0){
      this.incident.clusteredError.id = 0;
      this.incident.clusteredError.description = this.myForm.value.newClusteredError;
      this.incident.clusteredError.application_id = this.myForm.value.applicationId;
    }else{
      this.incident.clusteredError = this.clusteredErrors.find(error => error.id === this.myForm.value.clusteredErrorId)!;
    }
    this.incident.causeError = this.causeErrors.find(error => error.id === this.myForm.value.causeErrorId)!;
    this.incident.actionExecuted = this.actionExecuteds.find(action => action.id === this.myForm.value.actionExecutedId)!;
    this.incident.analyst = this.analysts.find(analyst => analyst.id === this.myForm.value.analyst)!;
    this.incident.stateRaizal = this.stateRaizals.find(state => state.id === this.myForm.value.stateRaizalId)!;
  }

  getAnalysts(idSolutionManager: number):void{
    const solutionManager = this.solutionManagers.find(app => app.id === idSolutionManager);
    if (solutionManager) {
      this.analysts = [];
      solutionManager.groups.forEach( group => {
        this.analysts.push(...group.analysts)
      });
    }
  }

  onSave(){
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched();
      return;
    }
    
    this.assingValues();

    this.incidentService.saveIncident(this.incident).subscribe( incident => {
      this.incident = incident;
      //this.myForm.reset();
      this.incidentService.getSolutionTemplate(incident.id).subscribe(templateSolution => {
        const dialogRef = this.dialog.open(GeneralDialogComponent, {
          data: templateSolution
        });
  
        dialogRef.afterClosed().subscribe(result => {
          this.utilidadService.copyToClipboard(incident.id);
          this.router.navigate(["/incidents/list"]);
        });
      })
      
    });
  }

 }
