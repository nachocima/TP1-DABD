import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  @Output() onPedir = new EventEmitter();
  @Output() onPlantarse = new EventEmitter();
  @Output() onNuevoJuego = new EventEmitter();
  @Input() jugar = false;

  constructor() { }

  ngOnInit(): void {
  }

  pedir(){
    this.onPedir.emit();
  }

  plantarse(){
    this.onPlantarse.emit();
  }

  nuevaPartida(){
    this.jugar = true;
    this.onNuevoJuego.emit();
  }

}
