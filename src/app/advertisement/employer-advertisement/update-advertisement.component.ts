import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Advertisement } from '../../model/advertisement';
import { AdvertisementService } from '../../service/advertisement.service';
import { TokenService } from '../../service/token.service';
import { EmployerService } from '../../service/employer.service';
import { ApplicationService } from '../../service/application.service';
import { RequestDto } from 'src/app/dto/request-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-advertisement',
  templateUrl: './update-advertisement.component.html',
  styleUrls: ['./update-advertisement.component.css']
})
export class UpdateAdvertisementComponent implements OnInit {

  id: number;
  email: string;
  advertisement: Advertisement;
  advertisementIdDto: RequestDto;
  isValidated: boolean;
  errorMessage: string;

  title: string;
  type: string;
  city: string;
  payment: number;
  description: string;
  form: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private advertisementService: AdvertisementService, private applicationService: ApplicationService, private tokenService: TokenService,
    private employerService: EmployerService, private fb: FormBuilder, public matDialog: MatDialog) {
    this.form = fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      city: ['', [Validators.nullValidator]],
      payment: ['', [Validators.nullValidator]],
      description: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.email = this.tokenService.getEmail();
    if (this.roleCheck()) {
      this.isValid();
    }
    this.getAdvertisement();
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
  getAdvertisement() {
    this.advertisementIdDto = new RequestDto();
    this.advertisementIdDto.id = this.id;
    this.advertisementService.getMyAdvertisement(this.email, this.advertisementIdDto).subscribe(
      response => {
        this.advertisement = response;
        if (!this.advertisement) {
          this.router.navigate(['employer/advertisement/list']);
          this.toastr.error('Nincs megfelelő jogosultságod!', 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
        this.id = this.advertisement.id;
        this.title = this.advertisement.title;
        this.type = this.advertisement.type;
        this.city = this.advertisement.city;
        this.payment = this.advertisement.payment;
        this.description = this.advertisement.description;
      },
      error => {
        this.errorMessage = error.error.message;
        this.router.navigate(['employer/advertisement/list']);
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  editAdvertisement() {
    this.advertisement.title = this.title;
    this.advertisement.type = this.type;
    this.advertisement.city = this.city;
    this.advertisement.payment = this.payment;
    this.advertisement.description = this.description;

    this.advertisementService.updateAdvertisement(this.id, this.advertisement)
      .subscribe(data => {
        this.toastr.success('Álláshirdetésedet sikeresen módosítottad!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.backToList();
      }, err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err)
      }
      );

  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }

  backToList() {
    this.router.navigate(["employer/advertisement/details/" + this.id])
  }

}
