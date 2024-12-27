import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthItComponent } from './components/health-it/health-it.component';
import { DigitalHealthComponent } from './components/digital-health/digital-health.component';
import { LayoutComponent } from './components/common/layout/layout.component';

const routes: Routes = [
  {
    path: '' , component : LayoutComponent , children:[
  {
    path: '' , redirectTo: 'health&it' , pathMatch:'full'
  },
  {
    path: 'health&it', component: HealthItComponent
  },
  { 
    path: 'digitalhealth',component: DigitalHealthComponent
  }
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
