import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(MatSnackBarModule),
    provideRouter(routes),
    provideAnimations()
]
})
  .catch(err => console.error(err));
