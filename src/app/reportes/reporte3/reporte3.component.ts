import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Reporte3 } from 'src/app/models/Reporte3';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.component.html',
  styleUrls: ['./reporte3.component.css']
})
export class Reporte3Component implements OnInit {

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
      this.service.getJugadas21().subscribe({
        next:(r: Reporte3) => {  this.datos = {
          labels: [["Jugadas Con Puntaje 21"]],
          datasets: [
          {
            data: [r.jugadas],
            label: 'Total Jugadas'
          },
          {  
            data: [r.croupier],
            label: 'Croupier'
          },
          { 
            data: [r.jugador],
            label: 'Jugador'
          },
        ]
        }},
        error: (e) => console.log(e)
      })
    );
  }


}
