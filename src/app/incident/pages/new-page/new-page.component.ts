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
import { group } from '@angular/animations';
import { SolutionManagerService } from '../../services/SolutionManager.service';

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

  public myForm: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(6)]],
    applicationId: ['', Validators.required],
    clusteredErrorId: ['', Validators.required],
    causeErrorId: ['', Validators.required],
    actionExecutedId: ['', Validators.required],
    huRaizal: ['', Validators.required],
    stateRaizalId: ['', Validators.required],
    solutionManagerId: ['', Validators.required],
    analyst: ['', Validators.required],
  })

  constructor( private fb: FormBuilder,
               private applicationService:ApplicationService, 
               private causeErrorService:CauseErrorService,
               private actionExecutedService:ActionExecutedService,
               private stateRaizalService: StateRaizalService,
               private solutionManagerService:SolutionManagerService){
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
    }
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

    this.incident.id = this.myForm.value.id;
    this.clusteredErrors = this.myForm.value.clusteredError;
    

  }

 }
