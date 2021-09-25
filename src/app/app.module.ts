import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxPaginationModule } from 'ngx-pagination';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { interceptorProvider } from './interceptor/user-interceptor.service';
import { ActivationComponent } from './activation/activation.component';
import { HelpComponent } from './help/help.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile/profile-update.component';
import { PasswordUpdateComponent } from './profile/password-update.component';
import { EmployeeListComponent } from './admin-dashboard/employee-list/employee-list.component';
import { EmployerListComponent } from './admin-dashboard/employer-list/employer-list.component';
import { EmployeeDetailsComponent } from './admin-dashboard/employee-list/employee-details.component';
import { EmployeeUpdateComponent } from './admin-dashboard/employee-list/employee-update.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployerDetailsComponent } from './admin-dashboard/employer-list/employer-details.component';
import { EmployerUpdateComponent } from './admin-dashboard/employer-list/employer-update.component';
import { MatModalComponent } from './mat-modal/mat-modal.component';
import { CreateAdvertisementComponent } from './advertisement/employer-advertisement/create-advertisement.component';
import { ApplyAdvertisementComponent } from './advertisement/employee-advertisement/apply-advertisement.component';
import { DetailsAdvertisementComponent } from './advertisement/employee-advertisement/details-advertisement.component';
import { MatNativeDateModule} from '@angular/material/core';
import { ListApplicationComponent } from './application/employee-application/list-application.component';
import { DetailsApplicationComponent } from './application/employee-application/details-application.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    IndexComponent,
    NavigationComponent,
    ActivationComponent,
    HelpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    PasswordUpdateComponent,
    EmployeeListComponent,
    EmployerListComponent,
    EmployeeDetailsComponent,
    EmployeeUpdateComponent,
    PageNotFoundComponent,
    EmployerDetailsComponent,
    EmployerUpdateComponent,
    MatModalComponent,
    CreateAdvertisementComponent,
    ApplyAdvertisementComponent,
    DetailsAdvertisementComponent,
    ListApplicationComponent,
    DetailsApplicationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgxPaginationModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [
    interceptorProvider,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }