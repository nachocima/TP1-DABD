import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  r1 = true;
  r2 = false;
  r3 = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  volver(){
    this.router.navigateByUrl('/main')
  }

  goReportes(r: number){
    if(r == 1){
      this.r1 = true
      this.r2 = false
      this.r3 = false
    }
    else if(r == 2){
      this.r1 = false
      this.r2 = true
      this.r3 = false
    }
    else{
      this.r1 = false
      this.r2 = false
      this.r3 = true
    }
  }

}
