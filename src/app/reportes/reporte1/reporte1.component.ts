import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Reporte1 } from 'src/app/models/Reporte1';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit, OnDestroy {

  datos: ChartData<'pie'>;
  subscription = new Subscription();

  constructor(private service: ReportesService) { }

  ngOnInit(): void {
    this.getDatos()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDatos(){
    this.service.getIndiceVictorias().subscribe({
      next:(r:Reporte1) => {
        this.datos = {
          labels: ["Ganador Croupier", "Ganador Jugadores", "Empate"],
          datasets: [
            {
            data: [r.indiceCroupier, r.indiceJugador, r.indiceEmpate]
            }
          ]
        }
      },
      error: (e)=> console.log(e)
    })
  }

}
