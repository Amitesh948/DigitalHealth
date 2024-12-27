import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'',redirectTo:'/health-it', pathMatch:'full'},
    {path:'health-it',component:DashboardComponent},
    {path:'digital-health' , component:DashboardComponent}
];
