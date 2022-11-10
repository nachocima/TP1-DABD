import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reporte1 } from '../models/Reporte1';
import { Reporte2 } from '../models/Reporte2';
import { Reporte3 } from '../models/Reporte3';

@Injectable()
export class ReportesService {

  constructor(private http: HttpClient) { }

  getIndiceVictorias(): Observable<Reporte1>{
    var url = environment.url + "reportes/reporte1"
    return this.http.get<Reporte1>(url);
  }

  getJuegosJugadoresDia(): Observable<Reporte2>{
    var url = environment.url + "reportes/reporte2"
    return this.http.get<Reporte2>(url);
  }

  getJugadas21(): Observable<Reporte3>{
    var idUser = localStorage.getItem("id_user");
    var url = environment.url + "reportes/reporte3?idUser=" + idUser
    return this.http.get<Reporte3>(url);
  }
}
