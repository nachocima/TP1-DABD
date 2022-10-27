import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';
import { UsuarioRespuesta } from '../models/UsuarioRespuesta';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: Usuario): Observable<UsuarioRespuesta>{
    var url = environment.url + "login"
    return this.http.post<UsuarioRespuesta>(url, user);
  }

  nuevoUser(user: Usuario): Observable<UsuarioRespuesta>{
    var url = environment.url + "post/user"
    return this.http.post<UsuarioRespuesta>(url, user);
  }

  guardarUsuario(user: string, id: number){
    localStorage.setItem("usuario", user);
    localStorage.setItem("id_user", id.toString());
  }

  setUserLogged() {
    sessionStorage.setItem("logged", "true");

  }

  setUserLogout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("id_user");
    localStorage.removeItem("id_partida");
    localStorage.removeItem("id_jugada");
    sessionStorage.removeItem("logged");
}

  isLogged() :boolean {
    return sessionStorage.getItem("logged") === "true";
  }

  gurdarPartida(id: number){
    localStorage.setItem("id_partida", id.toString());
  }

  gurdarJugada(id: number){
    localStorage.setItem("id_jugada", id.toString());
  }
}
