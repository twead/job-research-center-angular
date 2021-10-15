import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { TokenService } from '../service/token.service';
import { UserProfileService } from '../service/user-profile.service';

@Component({
  selector: 'app-update-email-activation',
  templateUrl: './update-email-activation.component.html',
  styleUrls: ['./update-email-activation.component.css']
})
export class UpdateEmailActivationComponent implements OnInit {

  szakdolgozatEmail = environment.szakdolgozatEmail;

  constructor(private activatedRoute: ActivatedRoute,
    private profileService: UserProfileService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activation();
  }

  activation() {
    this.profileService.updateEmailActivation(this.activatedRoute.snapshot.url[1].path).subscribe(
      data => {
        this.toastr.success('Sikeres email módosítás!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        if (this.tokenService.isLogged)
          this.onLogout();
      },
      error => {
        this.toastr.error('Sikertelen email módosítás!', 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  backToIndex() {
    this.router.navigate(['']);
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  onLogout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/']);
  }

}
