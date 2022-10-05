import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesaComponent } from './mesa/mesa.component';
import { JugadorComponent } from './jugador/jugador.component';
import { CroupierComponent } from './croupier/croupier.component';
import { MazoService } from './services/mazo.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    MesaComponent,
    JugadorComponent,
    CroupierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MazoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
