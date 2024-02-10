import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './layoutPage.component.html',
  styleUrls: ['./layoutPage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Pagina principal', icon: 'home', url: './dashboard' },
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new_incident' },
    { label: 'Reportes', icon: 'done', url: './report' },
  ]

 }
