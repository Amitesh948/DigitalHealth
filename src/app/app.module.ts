import { NgModule   } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LayoutComponent } from './components/common/layout/layout.component';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { HealthItComponent } from './components/health-it/health-it.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { WorldmapComponent } from './components/worldmap/worldmap.component';
import {ScrollingModule} from '@angular/cdk/scrolling'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RadarchartComponent } from './components/radarchart/radarchart.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    HealthItComponent,
    BarchartComponent,
    WorldmapComponent,
    RadarchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    FormsModule,
    ScrollingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    NgxEchartsModule
],
providers: [
  {
    provide: NGX_ECHARTS_CONFIG,
    useValue: {
      echarts: () => import('echarts') // Lazy load echarts
    }
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
