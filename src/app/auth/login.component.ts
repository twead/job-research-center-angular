import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from '../dto/login-user';
import { LoginVerificationDto } from '../dto/login-verification-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: LoginUser;
  email: string;
  password: string;
  verificationCode: string;
  errorMessage: string;

  showVerificationForm: boolean;
  verificationDto: LoginVerificationDto;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  resendVerification() {
    this.verificationCode = null;
    this.onLogin();
  }

  onLoginVerification(): void {
    this.verificationDto = new LoginVerificationDto(this.verificationDto.email, this.verificationDto.password, this.verificationCode);
    console.log(this.verificationCode);
    console.log(this.verificationDto.loginVerificationCode);
    this.authService.loginWithVerification(this.verificationDto).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.toastr.success('Sikeresen bejelentkeztél!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.errorMessage = err.error?.message;
        this.toastr.error(this.errorMessage, 'Hiba', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.email, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        if (data.email) {
          this.toastr.success('Megerősítő kód elküldve a megadott email címre!', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.showVerificationForm = true;
          this.verificationDto = data;
        }
        else {
          this.tokenService.setToken(data.token);
          this.toastr.success('Sikeresen bejelentkeztél!', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        }
      },
      err => {
        this.errorMessage = err.error?.message;
        this.toastr.error(this.errorMessage, 'Bejelentkezés nem sikerült!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      }
    );
  }

  forgotPassword() {
    this.router.navigate(["/forgot-password"]);
  }

  backToIndex() {
    this.router.navigate(["/"]);
  }

}