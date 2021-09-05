import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { ActivationComponent } from './activation/activation.component';
import { IndexComponent } from './index/index.component';
import { LoginGuard } from './guard/login.guard';
import { HelpComponent } from './help/help.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';






const routes: Routes = [
  {path: '', component: IndexComponent},  
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard]},
  {path: 'activation/:code', component: ActivationComponent, canActivate: [LoginGuard]},
  {path: 'help', component: HelpComponent, canActivate: [LoginGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoginGuard]},
  {path: 'reset-password/:code', component: ResetPasswordComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
