import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestemapComponent } from './testemap/testemap.component';
import { MapComponent } from './map/map.component';
import { MapCircleComponent } from './map-circle/map-circle.component';
import { MapPointComponent } from './map-point/map-point.component';

@NgModule({
  declarations: [
    AppComponent,
    TestemapComponent,
    MapComponent,
    MapCircleComponent,
    MapPointComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
