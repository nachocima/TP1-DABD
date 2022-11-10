import { Component, Input, OnInit } from '@angular/core';
import { Carta } from '../models/Carta';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent implements OnInit {

  @Input() mazo2: Carta[] = [];
  @Input() mazo3: Carta[] = [];
  @Input() mostrar = false;

  constructor() { }

  ngOnInit(): void {
  }

}
