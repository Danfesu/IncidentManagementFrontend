import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: `./main-page.component.html`,
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent { }
