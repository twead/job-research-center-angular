import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: number;
  errorMessage: string;
  isEnabled = false;
  employee: User;

  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminDashboardService, private toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.roleCheck()) {
      this.id = this.route.snapshot.params['id'];
      this.getEmployee();
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

  getEmployee() {
    this.adminService.getUserById(this.id)
      .subscribe(
        data => {
          this.employee = data;
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
    this.router.navigate(['employees']);
  }

  updateEmployee(id: number) {
    this.router.navigate(['employee/update', id]);
  }

}
