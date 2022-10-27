import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Carta } from '../models/Carta';
import { Respuesta } from '../models/Respuesta';
import { UsuarioRespuesta } from '../models/UsuarioRespuesta';
import { LoginService } from '../services/login.service';
import { MazoService } from '../services/mazo.service';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  partida: number = 0;
  carta: Carta;
  @Output() onPedir = new EventEmitter<Carta>();
  @Output() onPlantarse = new EventEmitter();
  @Output() onNuevoJuego = new EventEmitter();
  @Output() onFinPartida = new EventEmitter();
  @Input() jugar = false;

  constructor(private service: MazoService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pedir(){
    this.subscription.add(
      this.service.pedirCarta(true).subscribe({
        next:(r: Carta) => {this.onPedir.emit(r);},
        error:(e)=> alert(e)
      })
    )
  }

  plantarse(){
    this.onPlantarse.emit();
  }

  nuevaPartida(){
    this.jugar = true;
    this.subscription.add(
      this.service.nuevaJugada().subscribe({
        next: (r: Respuesta)=> this.guardarJugada(r.id),
        error:(e)=> console.log(e.error)
      })
    )
    this.onNuevoJuego.emit();
  }

  terminarPartida(){
    Swal.fire({
      title: "Finalizar Partida",
      text: "¿Seguro que desea finalizar la partida?",
      background: '#111',
      color: 'rgb(77, 75, 16)',
      confirmButtonText: 'Si',
      confirmButtonColor: '#333',
      showCancelButton: true,
      cancelButtonColor: '#333',
      cancelButtonText: 'No',
      preConfirm: (login) => {
        this.router.navigateByUrl("/main")
      }
    })
  }

  guardarJugada(id: number){
    this.partida = id;
    this.loginService.gurdarJugada(this.partida);
  }

}
