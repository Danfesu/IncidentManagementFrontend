import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IncidentService } from '../../services/Incident.service';
import { Observable } from 'rxjs';
import { BarGraphComponent } from '../../components/BarGraph/BarGraph.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UtilidadService } from '../../../shared/services/utilidad.service';
import { MaterialModule } from 'src/app/material/material.module';
import { NativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [
    CommonModule,
    BarGraphComponent,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [NativeDateAdapter],
  templateUrl: `./report-page.component.html`,
  styleUrls: ['./report-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportPageComponent implements OnInit{ 

  label: string = "Cantidad Incidentes";
  observableDays!: Observable<[[string,number]]>;
  observableApps!: Observable<[[string,number]]>;

  public myForm: FormGroup = this.fb.group({
    startDate: ['', Validators.required],
    startEnd: ['', Validators.required]
  });


  constructor(private incidentService:IncidentService,
              private fb: FormBuilder,
              private utilidadService:UtilidadService){}

  ngOnInit(): void {
    this.observableDays = this.incidentService.getAmountIncidentsPerDay("2024-02-01","2024-02-15");
    this.observableApps = this.incidentService.getAmountIncidentsPerApp("2024-02-01","2024-02-15");
  }


  generateReport(){
    const startDate = moment(this.myForm.value.startDate).format('DD/MM/YYYY');
    const endDate = moment(this.myForm.value.endDate).format('DD/MM/YYYY');

    if(startDate === 'Invalid date' || endDate === 'Invalid date'){
      this.utilidadService.mostrarAlerta("Debe ingresar ambas fechas","Opps!");
      return;
    }

  }

}
