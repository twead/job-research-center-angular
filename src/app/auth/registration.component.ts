import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from '../dto/new-user';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newUser: NewUser;
 
  email: string;
  password: string;
  name: string;
  dateOfBorn: Date;
  phoneNumber: string;
  isEmployer: Boolean;

  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onRegister(): void{
    this.newUser = new NewUser( this.email, this.password,this.name, this.dateOfBorn, this.phoneNumber, this.isEmployer);
    this.authService.addUser(this.newUser).subscribe(
      data => {
        this.toastr.success('Sikeres regisztráció!', 'OK', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'A regisztráció nem sikerült!', {
          timeOut: 2000,  positionClass: 'toast-top-center',
        });

      }
    );
  }

}
