import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordDto } from '../dto/forgot-password-dto';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  user: User;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.forgotPassword(new ForgotPasswordDto(this.email)).subscribe(
      data => {
        this.toastr.success('Kérlek ellenőrizd a bejövő emaileket!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Ez az email nem tartozik egyetlen fiókhoz sem!', 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  backToLogin() {
    this.router.navigate(["/login"]);
  }

}