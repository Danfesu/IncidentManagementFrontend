import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error404-page',
  standalone: true,
  templateUrl: `./Error404-page.component.html`,
  styleUrls: ['./Error404-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404PageComponent { }
