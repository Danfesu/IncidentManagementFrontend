import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bar-graph',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule
  ],
  templateUrl: `./BarGraph.component.html`,
  styleUrls: ['./BarGraph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarGraphComponent implements OnInit{
  
  @Input() observable!: Observable<[[string, number]]>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  labels: string[] = [];
  data: number[] = [];
  
  
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [
      { data: this.data, label: "Cantidad de incidentes", backgroundColor: "#3F51B5" },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ngOnInit(): void {
    this.observable.subscribe(data=>{
      data.forEach( item => {
        this.labels.push(item[0]);
        this.data.push(item[1])
      });
      this.chart?.update();
    })
  } 

}
