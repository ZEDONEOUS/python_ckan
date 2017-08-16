import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CkanService } from './services/ckan.service';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { NvD3Component } from 'ng2-nvd3';

import 'd3';
import 'nvd3';
import { PiechartComponent } from './components/piechart/piechart.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { GeneraltableComponent } from './components/generaltable/generaltable.component';

@NgModule({
  declarations: [
    AppComponent,
    NvD3Component,
    AnalyticsComponent,
    PiechartComponent,
    BarchartComponent,
    GeneraltableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    CkanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
