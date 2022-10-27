import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carta } from '../models/Carta';
import { Respuesta } from '../models/Respuesta';


@Injectable()
export class MazoService {

  private mazo: Carta[] = [];
  private palos: string[] = [];
  private valores: number[] = [];
  private cartas: string[] = [];

  constructor(private http: HttpClient) { 

  }

  getMazo(cant: number): Observable<Carta[]>{
    var url = environment.url + "get/mazo?mazos=" + cant;
    return this.http.get<Carta[]>(url);
  }

  getCartasUsadas(): Observable<number>{
    var partidaId = localStorage.getItem("id_partida");
    var url = environment.url + "get/cartasUsadas?partida=" + partidaId;
    return this.http.get<number>(url);
  }

  pedirCarta(jugador: boolean): Observable<Carta>{
    var partidaId = localStorage.getItem("id_partida");
    var jugadaId = localStorage.getItem("id_jugada");
    var url = environment.url + "get/carta?partida=" + partidaId + "&jugada=" + jugadaId + "&jugador=" + jugador

    return this.http.get<Carta>(url);
  }

  cartasJugador(): Observable<Carta[]>{
    var partidaId = localStorage.getItem("id_partida");
    var jugadaId = localStorage.getItem("id_jugada");
    var url = environment.url + "get/carta?partida=" + partidaId + "&jugada=" + jugadaId
    return this.http.get<Carta[]>(url);
  }

  nuevaPartida(): Observable<Respuesta>{
    var userId = localStorage.getItem("id_user");
    var url = environment.url + "post/partida?id_user=" + userId
    return this.http.post<any>(url, null);
  }

  nuevaJugada(): Observable<Respuesta>{
    var partidaId = localStorage.getItem("id_partida");
    var url = environment.url + "post/jugada?id_partida=" + partidaId
    return this.http.post<any>(url, null);
  }



}
