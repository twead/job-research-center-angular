import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewAdvertisement } from '../../dto/new-advertisement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { TokenService } from 'src/app/service/token.service';
import { EmployerService } from 'src/app/service/employer.service';

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.css']
})
export class CreateAdvertisementComponent implements OnInit {


  form: FormGroup = new FormGroup({});
  newAdvertisement: NewAdvertisement;

  email: string;

  title: string;
  type: string;
  city: string;
  payment: number;
  description: string;

  isValidated: boolean;
  errorMessage: string;

  constructor(private router: Router, private toastr: ToastrService, private fb: FormBuilder,
    private advertisementService: AdvertisementService, private tokenService: TokenService,
    private employerService: EmployerService) {
    this.form = fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      city: ['', [Validators.nullValidator]],
      payment: ['', [Validators.nullValidator]],
      description: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.email = this.tokenService.getEmail();
    if (this.roleCheck()) {
      this.isValid();
    }
  }

  roleCheck() {
    if (this.tokenService.IsEmployer()) {
      return true;
    } else {
      this.router.navigate(['']);
      this.toastr.error('Nincs megfelelő jogosultságod!', 'Hiba!', {
        timeOut: 3000, positionClass: 'toast-top-center',
      }
      );
      return false;
    }
  }

  isValid() {
    this.employerService.isValidated(this.email)
      .subscribe(
        data => {
          this.isValidated = data;
          if (!this.isValidated) {
            this.router.navigate(['']);
            this.toastr.error('Nincs megfelelő jogosultságod!', 'Hiba!', {
              timeOut: 3000, positionClass: 'toast-top-center',
            }
            );
          }
        });
  }

  save(): void {
    this.newAdvertisement = new NewAdvertisement(this.title, this.type, this.city, this.payment, this.description);

    this.advertisementService.addAdvertisement(this.email, this.newAdvertisement).subscribe(
      data => {
        this.toastr.success('Sikeres állás meghirdetés!', 'OK', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'A létrehozás nem sikerült!', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });

      }
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }

  reload(){
    this.form.reset();
  }

}
