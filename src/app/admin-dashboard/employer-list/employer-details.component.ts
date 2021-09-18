import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.css']
})
export class EmployerDetailsComponent implements OnInit {

  id: number;
  employer: User;
  errorMessage: string;
  storageURL = environment.storageURL;
  szakdolgozatEmail = environment.szakdolgozatEmail;
  imagePath: string;
  picture: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminDashboardService, private toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.roleCheck()) {
      this.id = this.route.snapshot.params['id'];
      this.getEmployer();
    }
  }

  roleCheck() {
    if (!this.tokenService.IsAdmin()) {
      this.router.navigate(['']);
      this.toastr.error('Nincs megfelelő jogosultságod!', 'Hiba!', {
        timeOut: 3000, positionClass: 'toast-top-center',
      }
      );
      return false;
    }
    return true;
  }

  getEmployer() {
    this.adminService.getUserById(this.id)
      .subscribe(
        data => {
          this.employer = data;
          this.picture = this.employer.employer.picture;
          this.imagePath = this.storageURL + this.employer.email + '%2Fimages%2F' + this.picture + "?alt=media";
        },
        error => {
          this.errorMessage = error.error.message;
          this.backToList();
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      );
  }

  backToList() {
    this.router.navigate(['employers']);
  }

  updateEmployer(id: number) {
    this.router.navigate(['employer/update', id]);
  }

}
