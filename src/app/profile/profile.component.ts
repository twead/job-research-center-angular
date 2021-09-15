import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { UserProfileService } from '../service/user-profile.service';
import { TokenService } from '../service/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email: string = this.tokenService.getEmail();
  profileData: User;
  isEmployer = false;
  isRedirect: boolean;
  storageURL = environment.storageURL;
  szakdolgozatEmail = environment.szakdolgozatEmail;
  imagePath: string;
  picture: string;

  constructor(private router: Router, private userProfileService: UserProfileService,
    private tokenService: TokenService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getProfile();
    this.isEmployer = this.tokenService.IsEmployer();
  }

  getProfile() {
    this.profileData = new User();

    this.userProfileService.getProfileDetails(this.email)
      .subscribe(
        data => {
          this.profileData = data;
          if (this.isEmployer == true) {
            this.picture = this.profileData.employer.picture;
            this.imagePath = this.storageURL + this.email + '%2Fimages%2F' + this.picture + "?alt=media";
          }
        },
        err => {
          this.toastr.error('Ez a felhasználó nem létezik!', 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          console.log(err)
        }

      );
  }

  updateProfile() {
    this.router.navigate(['profile/update']);
  }

  updatePassword() {
    this.router.navigate(['profile/password-update']);
  }

}