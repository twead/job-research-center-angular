import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { ActivationComponent } from './activation/activation.component';
import { IndexComponent } from './index/index.component';
import { LoginGuard } from './guard/login.guard';
import { UserGuardService } from './guard/user-guard.service';
import { HelpComponent } from './help/help.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile/profile-update.component';
import { PasswordUpdateComponent } from './profile/password-update.component';
import { EmployeeListComponent } from './admin-dashboard/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './admin-dashboard/employee-list/employee-details.component';
import { EmployeeUpdateComponent } from './admin-dashboard/employee-list/employee-update.component';
import { EmployerListComponent } from './admin-dashboard/employer-list/employer-list.component';
import { EmployerDetailsComponent } from './admin-dashboard/employer-list/employer-details.component';
import { EmployerUpdateComponent } from './admin-dashboard/employer-list/employer-update.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard] },
  { path: 'activation/:code', component: ActivationComponent, canActivate: [LoginGuard] },
  { path: 'help', component: HelpComponent, canActivate: [LoginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoginGuard] },
  { path: 'reset-password/:code', component: ResetPasswordComponent, canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [UserGuardService], data: { expectedRole: ['employer', 'employee'] } },
  { path: 'profile/update', component: ProfileUpdateComponent, canActivate: [UserGuardService], data: { expectedRole: ['employee', 'employer'] } },
  { path: 'profile/update', component: ProfileUpdateComponent, canActivate: [UserGuardService], data: { expectedRole: ['employee', 'employer'] } },
  { path: 'profile/password-update', component: PasswordUpdateComponent, canActivate: [UserGuardService], data: { expectedRole: ['employer', 'employee'] } },
  { path: 'employees', component: EmployeeListComponent, canActivate: [UserGuardService], data: { expectedRole: ['admin'] } },
  { path: 'employers', component: EmployerListComponent, canActivate: [UserGuardService], data: { expectedRole: ['admin'] } },
  { path: 'employee/details/:id', component: EmployeeDetailsComponent, canActivate: [UserGuardService], data: { expectedRole: ['admin'] } },
  { path: 'employer/details/:id', component: EmployerDetailsComponent, canActivate: [UserGuardService], data: { expectedRole: ['admin'] } },
  { path: 'employee/update/:id', component: EmployeeUpdateComponent, canActivate: [UserGuardService], data: { expectedRole: ['admin'] } },
  { path: 'employer/update/:id', component: EmployerUpdateComponent, canActivate: [UserGuardService], data: { expectedRole: ['admin'] } },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
