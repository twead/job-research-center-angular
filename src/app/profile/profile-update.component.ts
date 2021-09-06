import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { UserProfileService } from '../service/user-profile.service';
import { TokenService } from '../service/token.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  updateProfile: User;
  isEmployer = false;
  errorMessage: string;

  email: string;
  newEmail: string;
  name: string;
  address: string;
  dateOfBorn: Date;
  phoneNumber: string;
  picture: string;


  constructor(private tokenService: TokenService, private userProfileService: UserProfileService,
              private toastr: ToastrService, private router: Router, private https: HttpClient,
              private fb: FormBuilder) { 
                this.form = fb.group({
                  name: ['', [Validators.required]],
                  phoneNumber: ['', [Validators.nullValidator]],
                  dateOfBorn: ['', [Validators.nullValidator]]
                })
              }

  get f(){  
    return this.form.controls;  
  }   

  submit(){
    console.log(this.form.value);
  }
            
  ngOnInit(): void {
    this.updateProfile = new User();
    this.email = this.tokenService.getEmail();
    this.isEmployer = this.tokenService.IsEmployer();

    this.userProfileService.getProfileDetails(this.email)
    .subscribe(data => {
      this.updateProfile = data;
      this.name = this.updateProfile.name;
      this.email = this.updateProfile.email;
      this.dateOfBorn = this.updateProfile.dateOfBorn;
      this.phoneNumber = this.updateProfile.phoneNumber;
    }, error => console.log(error));

  }

  editProfile() {
    this.updateProfile.name = this.name;
    this.updateProfile.email = this.email;
    this.updateProfile.dateOfBorn = this.dateOfBorn;
    this.updateProfile.phoneNumber = this.phoneNumber;

    this.userProfileService.updateProfile(this.email, this.updateProfile)
      .subscribe(data => {
        this.toastr.success('Profilodat sikeresen módosítottad!', 'OK', {
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

  onSubmit() {
    this.editProfile();
  }

  backToProfile(){
    this.router.navigate(['/profile']);
  }

}