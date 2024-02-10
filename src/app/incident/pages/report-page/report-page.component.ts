import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: `./report-page.component.html`,
  styleUrls: ['./report-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportPageComponent { }
