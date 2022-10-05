import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/Carta';

@Injectable()
export class MazoService {

  private mazo: Carta[] = [];
  private palos: string[] = [];
  private valores: number[] = [];
  private cartas: string[] = [];

  constructor(private http: HttpClient) { 
    this.cargarArreglos();
    this.cargraMazo();
  }

  cargraMazo(){
    var palo = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        var c = new Carta();
        c.palo = this.palos[palo]
        c.carta = this.cartas[j]
        c.valor = this.valores[j]
        this.mazo.push(c);
      }
      palo++
    }
  }

  cargarArreglos(){
    this.palos.push("Trebol")
    this.palos.push("Pica")
    this.palos.push("Corazon")
    this.palos.push("Diamante")

    this.cartas.push("As")
    this.cartas.push("2")
    this.cartas.push("3")
    this.cartas.push("4")
    this.cartas.push("5")
    this.cartas.push("6")
    this.cartas.push("7")
    this.cartas.push("8")
    this.cartas.push("9")
    this.cartas.push("10")
    this.cartas.push("J")
    this.cartas.push("Q")
    this.cartas.push("K")

    this.valores.push(11)
    this.valores.push(2)
    this.valores.push(3)
    this.valores.push(4)
    this.valores.push(5)
    this.valores.push(6)
    this.valores.push(7)
    this.valores.push(8)
    this.valores.push(9)
    this.valores.push(10)
    this.valores.push(10)
    this.valores.push(10)
    this.valores.push(10)
  }

  getMazo(){
    return this.mazo;
  }


}
