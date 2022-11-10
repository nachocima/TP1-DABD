import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Reporte2 } from 'src/app/models/Reporte2';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {

  datos: ChartData<'bar', number[], string[]>;
  subscription = new Subscription();

  constructor(private service: ReportesService) { }

  ngOnInit(): void {
    this.getDatos()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDatos(){
    this.subscription.add(
      this.service.getJuegosJugadoresDia().subscribe({
        next:(r: Reporte2) => {  this.datos = {
          labels: [["Partidas y Jugadores por Día"]],
          datasets: [
          {
            data: [r.dias],
            label: 'Total Días'
          },
          {  
            data: [r.jugadoresDia],
            label: 'Jugadores'
          },
          { 
            data: [r.partidasDia],
            label: 'Partidas'
          },
        ]
        }},
        error: (e) => console.log(e)
      })
    );

  }

}
