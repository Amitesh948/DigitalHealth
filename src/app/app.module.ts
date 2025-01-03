import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LayoutComponent } from './components/common/layout/layout.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { HealthItComponent } from './components/health-it/health-it.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { WorldmapComponent } from './components/worldmap/worldmap.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    HealthItComponent,
    BarchartComponent,
    WorldmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
    }),
    NgbModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    FormsModule,
    
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
