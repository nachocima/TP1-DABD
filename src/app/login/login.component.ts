import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../models/Usuario';
import { UsuarioRespuesta } from '../models/UsuarioRespuesta';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  user = new Usuario();
  id: number = 0;
  form = new FormGroup({
    usuario: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(){
    if(this.form.invalid){
      this.showError("Debe completar todos los campos")
      return
    }
    this.user = this.form.value as Usuario
    this.subscription.add(
      this.loginService.login(this.user).subscribe({
        next: (r: UsuarioRespuesta) => {this.succes(r.id),this.showSucces("Bienvenido al juego " + r.usuario1)},
        error: (e) => this.showError(e.error)
      })
    )
  }

  postUser(){
    if(this.form.invalid){
      this.showError("Debe completar todos los campos")
      return
    }
    this.user = this.form.value as Usuario
    this.subscription.add(
      this.loginService.nuevoUser(this.user).subscribe({
        next: (r: UsuarioRespuesta) => {this.succes(r.id), this.showSucces("Usuario registrado: " + r.usuario1)},
        error: (e) => this.showError(e.error)
      })
    )
  }

  showError(texto: string){
    Swal.fire({
      title: "Error",
      text: texto,
      background: '#111',
      color: 'rgb(77, 75, 16)',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#333',
    })
  }

  showSucces(texto: string){
    Swal.fire({
      title: "Sesión Iniciada",
      text: texto,
      background: '#111',
      color: 'rgb(77, 75, 16)',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#333',
      preConfirm: () => {
        this.router.navigateByUrl("/main")
      }
    })
  }

  succes(id: number){
    this.id = id
    this.loginService.guardarUsuario(this.user.usuario, this.id)
    this.loginService.setUserLogged()
  }
  

}
