import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';
import { ApplicationDto } from 'src/app/dto/application-dto';
import { ApplicationService } from 'src/app/service/application.service';


@Component({
  selector: 'app-details-application',
  templateUrl: './details-application.component.html',
  styleUrls: ['./details-application.component.css']
})
export class DetailsApplicationComponent implements OnInit {

  id: number;
  email: string;
  errorMessage: string;
  details: ApplicationDto;
  storageURL = environment.storageURL;
  picture: string;
  imagePath: string;
  pdf: string;
  pdfPath: string;

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private fb: FormBuilder, private tokenService: TokenService, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    if (this.roleCheck()) {
      this.id = this.route.snapshot.params['id'];
      this.email = this.tokenService.getEmail();
      this.getApplicationDetails(this.id);
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

  getApplicationDetails(id: number) {
    this.applicationService.getApplicationDetails(this.id)
      .subscribe(
        data => {
          this.details = data;
          this.pdf = this.details.application.pdf;
          this.pdfPath = this.storageURL + this.details.user.email + '%2Fcv%2F'
            + this.details.advertisement.id + '%2F' + this.email + '%2F' + this.pdf + "?alt=media";
          this.picture = this.details.user.employer.picture;
          this.imagePath = this.storageURL + this.details.user.email + '%2Fimages%2F' + this.picture + "?alt=media";
        }, error => {
          this.errorMessage = error.error.message;
          this.backToList();
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        });
  }

  backToList() {
    this.router.navigate(['/employee/application/list']);
  }

}
