import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Carta } from '../models/Carta';
import { JugadaRespuesta } from '../models/JugadaRespuesta';
import { MazoService } from '../services/mazo.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit, OnDestroy {

  mazos: any
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
    this.mazos = prompt("Ingrese la cantidad de mazos (3, 4 o 5)", "");
    if(this.mazos != "3" && this.mazos != "4" && this.mazos != "5"){
      this.ngOnInit()
    }
    else{
      this.getMazos(this.mazos)
    }
  }

  getMazos(cant: number){
    this.subscription.add(
      this.service.getMazo(cant).subscribe({
        next: (r: Carta[]) => this.mazo = r,
        error: (e)=> alert(e.error)
      })
    )
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
    if(this.valor >= 21){
      
      this.validarJugada(0)
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
      this.mazo3.push(mazo[index])
    }

    this.validarJugada(v)
    this.jugar = false;  
  }

  validarJugada(pc: number){
    this.subscription.add(
      this.service.validarJugada(pc, this.valor).subscribe({
        next:(r: JugadaRespuesta) => this.mostrarAlert(r.ganador),
        error: (e)=> console.error(e.error)
        
      })
    );
  }

}
