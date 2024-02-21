import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IncidentService } from '../../services/Incident.service';
import { Observable } from 'rxjs';
import { BarGraphComponent } from '../../components/BarGraph/BarGraph.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MaterialModule } from 'src/app/material/material.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [
    CommonModule,
    BarGraphComponent,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Cambia 'es-ES' al locale que desees
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    // Otros proveedores si es necesario
  ],
  templateUrl: `./report-page.component.html`,
  styleUrls: ['./report-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportPageComponent implements OnInit{ 
  @ViewChild('barGraphDay') barGraphDay: BarGraphComponent | undefined;
  @ViewChild('barGraphApp') barGraphApp: BarGraphComponent | undefined;

  label: string = "Cantidad Incidentes";
  observableDays!: Observable<[[string,number]]>;
  observableApps!: Observable<[[string,number]]>;
  isValidReport:boolean = false;

  public myForm: FormGroup = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });


  constructor(private incidentService:IncidentService,
              private fb: FormBuilder){}

  ngOnInit(): void {
    
  }


  generateReport(){

    setTimeout(() => this.isValidReport = false);

    const startDate = moment(this.myForm.value.startDate).format('YYYY-MM-DD');
    const endDate = moment(this.myForm.value.endDate).format('YYYY-MM-DD');

    this.observableDays = this.incidentService.getAmountIncidentsPerDay(startDate,endDate);
    this.observableApps = this.incidentService.getAmountIncidentsPerApp(startDate,endDate);
    
    this.isValidReport = true;

  }

}
