import { Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/Error404-page/Error404-page.component';

export const routes: Routes = [
  {
    path: 'incidents',
    loadChildren: ()=> import('./incident/pages/routes')
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'incidents',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
