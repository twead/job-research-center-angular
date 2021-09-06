import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from '../dto/new-user';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { PasswordValidation } from '../validation/password-validation';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  newUser: NewUser;
 
  email: string;
  password: string;
  name: string;
  dateOfBorn: Date;
  phoneNumber: string;
  isEmployer: Boolean;

  errorMessage: string;
  confirmpassword: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { 
    this.form = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],  
      confirm_password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.nullValidator]],
      isEmployer: ['', [Validators.nullValidator]],
      dateOfBorn: ['', [Validators.nullValidator]]
    }, { 
      validator: PasswordValidation('password', 'confirm_password') 
    })
  }

  get f(){  
    return this.form.controls;  
  }   

  submit(){
    console.log(this.form.value);
  }

  ngOnInit(): void {
  }

  onRegister(): void{
    this.newUser = new NewUser( this.email, this.password,this.name, this.dateOfBorn, 
      this.phoneNumber, this.isEmployer);
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
