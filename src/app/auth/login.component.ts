import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from '../dto/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: LoginUser;
  email: string;
  password: string;
  errorMessage: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.email, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.toastr.success('Sikeresen bejelentkeztél!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.errorMessage = err.error?.message;
        this.toastr.error(this.errorMessage, 'Bejelentkezés nem sikerült!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      }
    );
  }

  forgotPassword(){
    this.router.navigate(["/forgot-password"]);
  }

}