import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from '../service/user-profile.service';
import { TokenService } from '../service/token.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { PasswordValidation } from '../validation/password-validation';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {

form: FormGroup = new FormGroup({});

email: string;
password: string;
confirmpassword: string;
errorMessage: string;

constructor(private tokenService: TokenService, private userProfileService: UserProfileService,
  private toastr: ToastrService, private router: Router, private fb: FormBuilder) { 
    this.form = fb.group({
      password: ['', [Validators.required]],  
      confirm_password: ['', [Validators.required]]
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
    this.email = this.tokenService.getEmail();
  }

  editProfile() {
    this.userProfileService.updatePassword(this.email, this.password)
      .subscribe(data => {
        this.toastr.success('', 'Jelszavadat sikeresen módosítottad!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.backToProfile();
      }, err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(err)
      }
    );
  }

  backToProfile(){
    this.router.navigate(['/profile']);
  }

  onSubmit(){
    this.editProfile();
  }

}