import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: `./main-page.component.html`,
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {

  pathImage:string = 'assets/images/logo.png';

 }
