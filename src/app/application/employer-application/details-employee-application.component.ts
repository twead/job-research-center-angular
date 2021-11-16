import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdvertisementService } from '../../service/advertisement.service';
import { TokenService } from '../../service/token.service';
import { EmployerService } from '../../service/employer.service';
import { ApplicationService } from '../../service/application.service';
import { ApplicationAndEmployeeDto } from 'src/app/dto/application-and-employee-dto';
import { RequestDto } from 'src/app/dto/request-dto';
import { MatModalComponent } from 'src/app/mat-modal/mat-modal.component';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-details-employee-application',
  templateUrl: './details-employee-application.component.html',
  styleUrls: ['./details-employee-application.component.css']
})
export class DetailsEmployeeApplicationComponent implements OnInit {

  id: number;
  email: string;
  details: ApplicationAndEmployeeDto;
  applicationIdDto: RequestDto;
  isValidated: boolean;
  errorMessage: string;
  storageURL = environment.storageURL;
  pdf: string;
  pdfPath: string;

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private advertisementService: AdvertisementService, private applicationService: ApplicationService, private tokenService: TokenService,
    private employerService: EmployerService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.email = this.tokenService.getEmail();
    if (this.roleCheck()) {
      this.isValid();
    }
    this.getApplicationAndEmployeeDetails();
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

  getApplicationAndEmployeeDetails() {
    this.applicationIdDto = new RequestDto();
    this.applicationIdDto.id = this.id;
    this.applicationService.getApplicationAndEmployeeDetails(this.email, this.applicationIdDto).subscribe(
      response => {
        this.details = response;
        this.pdf = this.details.application.pdf;
        this.pdfPath = this.storageURL + this.details.employer.id + '%2Fcv%2F'
          + this.details.advertisement.id + '%2F' + this.details.user.id + '%2F' + this.details.application.key + '%2F' + this.pdf + "?alt=media";
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



  deleteApplication(id: number, employeeName: string, advertisementId: number) {
    const dialogRef = this.matDialog.open(MatModalComponent, {
      width: '300px',
      data: {
        title: "Jelentkezés törlése:",
        paragraph: employeeName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.applicationService.deleteApplication(id)
          .subscribe(
            data => {
              this.toastr.success('Állásjelentkezés sikeresen törölve!', 'OK', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
              this.backToAdvertisement(advertisementId);
            },
            error => {
              this.errorMessage = error.error.message;
              this.toastr.error(this.errorMessage, 'Hiba!', {
                timeOut: 3000, positionClass: 'toast-top-center',
              }
              );
            }
          );
      }
    }
    );
  }

  sendMessage(id: number) {
    this.router.navigate(['new_message', id]);
  }

  backToAdvertisement(id: number) {
    this.router.navigate(["employer/advertisement/details/" + id])
  }

}
