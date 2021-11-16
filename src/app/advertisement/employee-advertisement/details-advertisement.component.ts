import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { AdvertisementDto } from 'src/app/dto/advertisement-dto';
import { environment } from 'src/environments/environment';
import { ApplicationService } from 'src/app/service/application.service';
import { ApplicationDto } from 'src/app/dto/application-dto';

@Component({
  selector: 'app-details-advertisement',
  templateUrl: './details-advertisement.component.html',
  styleUrls: ['./details-advertisement.component.css']
})
export class DetailsAdvertisementComponent implements OnInit {

  id: number;
  errorMessage: string;
  details: AdvertisementDto
  applications: Array<ApplicationDto> = [];
  storageURL = environment.storageURL;
  imagePath: string;
  picture: string;
  email: string;
  isApplied: boolean;
  applicationId: number;


  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private fb: FormBuilder, private tokenService: TokenService, private advertisementService: AdvertisementService,
    private applicationService: ApplicationService) { }

  ngOnInit(): void {
    if (this.roleCheck()) {
      this.email = this.tokenService.getEmail();
      this.id = this.route.snapshot.params['id'];
      this.getAdvertisementDetails(this.id);
      this.getAllMyApplication();
      this.isApplied = this.existApplication(this.id);
    }
  }

  roleCheck() {
    if (!this.tokenService.IsEmployee()) {
      this.router.navigate(['']);
      this.toastr.error('Nincs megfelelő jogosultságod!', 'Hiba!', {
        timeOut: 3000, positionClass: 'toast-top-center',
      }
      );
      return false;
    }
    return true;
  }

  getAdvertisementDetails(id: number) {
    this.advertisementService.getAdvertisementDetails(this.id)
      .subscribe(
        data => {
          this.details = data;
          this.picture = this.details.user.employer.picture;
          this.imagePath = this.storageURL + this.details.user.id + '%2Fimages%2F' + this.picture + "?alt=media";
        }, error => {
          this.errorMessage = error.error.message;
          this.backToList();
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        });
  }

  getAllMyApplication() {
    this.applicationService.getAllMyApplication(this.email).subscribe(
      response => {
        this.applications = response;
      },
      error => {
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  existApplication(id: number) {
    var result = false;
    if (this.applications.length > 0) {
      this.applications.forEach(element => {
        if (element.advertisement.id == id) {
          this.applicationId = element.application.id;
          result = true;
        }
      });
      return result;
    } else
      return result;
  }

  backToList() {
    this.router.navigate(['/']);
  }

  apply(id: number) {
    this.router.navigate(['employee/advertisement/apply', id]);
  }

  getApplicationDetails() {
    this.router.navigate(['employee/application/details', this.applicationId]);
  }

  sendMessage(id: number) {
    this.router.navigate(['new_message', id]);
  }

}
