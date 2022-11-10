import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesaComponent } from './mesa/mesa.component';
import { JugadorComponent } from './jugador/jugador.component';
import { CroupierComponent } from './croupier/croupier.component';
import { MazoService } from './services/mazo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component'
import { LoginService } from './services/login.service';
import { ReportesComponent } from './reportes/reportes.component';
import { ReportesService } from './services/reportes.service';
import { NgChartsModule } from 'ng2-charts';
import { Reporte1Component } from './reportes/reporte1/reporte1.component';
import { Reporte2Component } from './reportes/reporte2/reporte2.component';
import { Reporte3Component } from './reportes/reporte3/reporte3.component';
import { CartasComponent } from './cartas/cartas.component';

@NgModule({
  declarations: [
    AppComponent,
    MesaComponent,
    JugadorComponent,
    CroupierComponent,
    LoginComponent,
    MainComponent,
    ReportesComponent,
    Reporte1Component,
    Reporte2Component,
    Reporte3Component,
    CartasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [MazoService, LoginService, ReportesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
