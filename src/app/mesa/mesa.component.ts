import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Carta } from '../models/Carta';
import { MazoService } from '../services/mazo.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit, OnDestroy {

  mazo: Carta[] = [];
  mazo2: Carta[] = [];
  mazo3: Carta[] = [];
  mostrar = false;
  jugar: boolean;
  mensaje = "";
  valor: number = 0;
  valorCroupier: number = 0;
  carta: Carta;
  cartaC: Carta;
  subscription = new Subscription();
  croupierFlag = false;

  constructor(private service: MazoService, private router: Router) { 
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.service.getMazo(3).subscribe({
      next: (r: Carta[]) => this.mazo = r,
      error: (e)=> alert(e.error)
    })
  }

  onPedir(carta: Carta){
    this.pedirCarta(carta);
    this.mostrarCarta(true);
  }

  pedirCarta(carta: Carta){
    this.valor += carta.valor;
    this.mazo2.push(carta)
    if(carta.numero == "As" && this.valor > 21){
      this.valor -= 10
    }
    if(this.valor > 21){
      
      this.mostrarAlert("Se ha pasado con " + this.valor)
      this.jugar = false;
    }
    if(this.valor == 21){
      this.mostrarAlert("Ha ganado con " + this.valor)
      this.jugar = false;
    }
  }

  mostrarAlert(texto: string){
    Swal.fire({
      title: "Resultado",
      text: texto,
      background: '#111',
      color: 'rgb(77, 75, 16)',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#333',
    })
  }
  
  resetear(){
      this.valor = 0;
      this.valorCroupier = 0
      this.mazo2 = []
      this.mazo3 = []
      this.mostrarCarta(false)
      this.jugar = true;
      this.croupierFlag = false

      this.subscription.add(
        this.service.getCartasUsadas().subscribe({
          next:(r: number) => this.validarCantidadCartas(r),
          error: (e) => alert(e.error)
      }))
  }

  validarCantidadCartas(n: number){
    var texto = ""
    if(n == 1){
      texto = "No quedan cartas disponibles, si desea continuar jugando debe iniciar otra partida"
      this.router.navigateByUrl("/main")
    }
    else if(n == 2){
      texto = "Quedan pocas cartas en el mazo, esta podría ser la última jugada de la partida..."
    }
    if(n != 3){
      Swal.fire({
        title: "Atención!",
        text: texto,
        background: '#111',
        color: 'rgb(77, 75, 16)',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#333',
        showCancelButton: true,
      })
    }
  }

  mostrarCarta(b: boolean){
    this.mostrar = b;
  }

  croupierMostrar(){
    this.croupierFlag = true
  }

  croupier(mazo: Carta[]){

    var v = 0

    for (let index = 0; index < mazo.length; index++) {
      v += mazo[index].valor;
      if(mazo[index].numero == "As" && v > 21){
          v -= 10
      }
      this.mazo3.push(mazo[index])
    }

    if(v > this.valor && v <= 21){
      this.mostrarAlert("Croupier gana con: " + v + ", Jugador: " + this.valor)    
      this.jugar = false;
      return
    }
    if(this.valor == v){
      this.mostrarAlert("Empate")
      this.jugar = false;
      return
    }
    if(v > 21){
      this.mostrarAlert("Ha ganado con: " + this.valor + ", El Croupier se ha pasado con: " + v)
      this.jugar = false;
      return
    }
    this.mostrarAlert("Ha ganado con: " + this.valor + ", Croupier: " + v)
    this.jugar = false;
    
  }



}
