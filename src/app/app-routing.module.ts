import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MesaComponent } from './mesa/mesa.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "main", component: MainComponent, canActivate: [LoginGuard]},
  {path: "mesa", component: MesaComponent, canActivate: [LoginGuard]},
  {path: "**", redirectTo: "/login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
