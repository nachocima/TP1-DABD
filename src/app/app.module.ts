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

@NgModule({
  declarations: [
    AppComponent,
    MesaComponent,
    JugadorComponent,
    CroupierComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MazoService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
