import { Route } from '@angular/router';
import { LayoutPageComponent } from './layoutPage/layoutPage.component';
import { ListPageComponent } from './list-page/list-page.component';
import { NewPageComponent } from './new-page/new-page.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export default[
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            {path: 'dashboard', component: MainPageComponent},
            {path: 'list', component: ListPageComponent},
            {path: 'new_incident', component: NewPageComponent},
            {path: 'edit/:id', component: NewPageComponent},
            {path: 'report', component: ReportPageComponent},
            {path: '**', component: MainPageComponent}
        ]
    }
] as Route[];
