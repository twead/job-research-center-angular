import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  szakdolgozatEmail = environment.szakdolgozatEmail;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activation();
  }

  activation() {
    this.authService.activation(this.activatedRoute.snapshot.url[1].path).subscribe(
      data => {
        this.toastr.success('Sikeres email aktiválás!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Sikertelen email aktiválás!', 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(error)
      }
    );
  }

  backToIndex(){
    this.router.navigate(['']);
  }

  backToLogin(){
    this.router.navigate(['login']);
  }

}