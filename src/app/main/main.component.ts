import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Respuesta } from '../models/Respuesta';
import { LoginService } from '../services/login.service';
import { MazoService } from '../services/mazo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  
  constructor(private service: MazoService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  guardarPartida(){
    this.subscription.add(
      this.service.nuevaPartida().subscribe({
        next:(r: Respuesta) => this.succes(r.id),
        error:(e) => console.log(e)      
      })
    )
  }

  cerrarSesion(){
    Swal.fire({
      title: "Cerrar Sesión",
      text: "¿Seguro que desea cerrar la sesión?",
      background: '#111',
      color: 'rgb(77, 75, 16)',
      confirmButtonText: 'Si',
      confirmButtonColor: '#333',
      showCancelButton: true,
      cancelButtonColor: '#333',
      cancelButtonText: 'No',
      preConfirm: (login) => {
        this.loginService.setUserLogout()
        this.router.navigateByUrl("/login")
      }
    })

  }

  succes(id: number){
    this.loginService.gurdarPartida(id);
    this.router.navigateByUrl("/mesa")
  }



}
