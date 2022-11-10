import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from '../models/Carta';
import { MazoService } from '../services/mazo.service';

@Component({
  selector: 'app-croupier',
  templateUrl: './croupier.component.html',
  styleUrls: ['./croupier.component.css']
})
export class CroupierComponent implements OnInit {

  subscription = new Subscription();
  v = 0;
  mazo: Carta[]
  @Input() flag = false
  @Output() onMazo = new EventEmitter<Carta[]>();

  constructor(private service: MazoService) { }

  ngOnInit(): void {
    this.mazo = []
  }

  ngOnChanges(changes: SimpleChange){
    if(this.flag){
      this.mazo = []
      this.jugar()
    }
  }

  jugar(){

    this.service.pedirCarta(false).subscribe({
      next:(r: Carta) => {this.cargarMazo(r)},
      error:(e)=> alert(e)
    })

  }

  cargarMazo(carta: Carta){
    this.v += carta.valor
    if(carta.numero == "As" && this.v > 21){
      this.v -= 10
  }
    this.mazo.push(carta)
    if(this.v <= 16){
      this.jugar()
      return
    }
    this.onMazo.emit(this.mazo);
    this.v = 0
  }

}
