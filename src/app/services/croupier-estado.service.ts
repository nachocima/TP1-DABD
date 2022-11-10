import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CroupierEstadoService {

  private estado: Subject<boolean>;

  constructor() { 
    this.estado = new Subject<boolean>();
  }
}
