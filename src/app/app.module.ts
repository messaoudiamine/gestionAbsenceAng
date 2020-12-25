import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from './modules/layout/layout.module';
import { AuthComponent } from './auth/auth/auth.component';
import { ElevesService } from './services/eleves.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NiveauService } from './services/niveau.service';
import { AbsencesService } from './services/absences.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    ElevesService,
    NiveauService,
    AbsencesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
