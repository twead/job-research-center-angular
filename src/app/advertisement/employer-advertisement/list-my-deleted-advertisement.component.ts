import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Advertisement } from '../../model/advertisement';
import { AdvertisementService } from '../../service/advertisement.service';
import { TokenService } from '../../service/token.service';
import { EmployerService } from '../../service/employer.service';
import { MatModalComponent } from 'src/app/mat-modal/mat-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestDto } from 'src/app/dto/request-dto';



@Component({
  selector: 'app-list-my-deleted-advertisement',
  templateUrl: './list-my-deleted-advertisement.component.html',
  styleUrls: ['./list-my-deleted-advertisement.component.css']
})
export class ListMyDeletedAdvertisementComponent implements OnInit {

  email: string;
  advertisements: Array<Advertisement> = [];
  existData = true;
  isValidated: boolean;
  errorMessage: string;
  requestDto: RequestDto;

  constructor(private router: Router, private toastr: ToastrService,
    private advertisementService: AdvertisementService, private tokenService: TokenService,
    private employerService: EmployerService, public matDialog: MatDialog) { }

    ngOnInit(): void {
      this.email = this.tokenService.getEmail();
      if (this.roleCheck()) {
        this.isValid();
      }
      this.getAllMyAdvertisement();
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

    getAllMyAdvertisement() {
      this.requestDto = new RequestDto();
      this.requestDto.available = false;
      this.advertisementService.getAllMyAdvertisement(this.email, this.requestDto).subscribe(
        response => {
          this.advertisements = response;
          if (this.advertisements.length == 0) {
            this.existData = false;
  
          }
        },
        error => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      );
    }

    showAdvertisementDetails(id: number) {
      this.router.navigate(["employer/advertisement/details/" + id])
    }

}
