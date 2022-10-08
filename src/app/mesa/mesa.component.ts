import { Component, OnInit } from '@angular/core';
import { Carta } from '../models/Carta';
import { MazoService } from '../services/mazo.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  mazo: Carta[] = [];
  mazo2: Carta[] = [];
  mazo3: Carta[] = [];
  mostrar = false;
  jugar: boolean;
  mensaje = "";
  valor: number = 0;
  valorCroupier: number = 0;
  carta: string = ""

  constructor(private service: MazoService) { 

  }

  ngOnInit(): void {
    this.mazo = this.service.getMazo()
  }

  pedirCarta(){
    var carta = 0
    carta = Math.floor(Math.random() * this.mazo.length)
    this.valor += this.mazo[carta].valor;
    this.mazo2.push(this.mazo[carta])
    if(this.mazo[carta].carta == "As" && this.valor > 21){
      this.valor -= 10
    }
    if(this.valor > 21){
      alert("Se ha pasado con " + this.valor)
      this.jugar = false;
    }
    if(this.valor == 21){
      alert("Ha ganado con " + this.valor)
      this.jugar = false;
    }
  }
  
  resetear(){
      this.valor = 0;
      this.valorCroupier = 0
      this.mazo2 = []
      this.mazo3 = []
      this.mostrarCarta(false)
      this.jugar = true;
  }

  mostrarCarta(b: boolean){
    this.mostrar = b;
  }

  croupier(){
    while (this.valorCroupier <= 16 ) {
      var carta = 0
      carta = Math.floor(Math.random() * this.mazo.length)
      this.valorCroupier += this.mazo[carta].valor;
      this.mazo3.push(this.mazo[carta])
    }
    if(this.valorCroupier > this.valor && this.valorCroupier <= 21){
      alert("Croupier gana con: " + this.valorCroupier + " - Jugador: " + this.valor)    
      this.jugar = false;
      return
    }
    if(this.valor == this.valorCroupier){
      alert("Empate")
      this.jugar = false;
      return
    }
    alert("Jugador gana con: " + this.valor + " - Croupier: " + this.valorCroupier)
    this.jugar = false;
    
  }



}
