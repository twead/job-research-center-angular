import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  id: number;
  employee: User;

  email: string;
  name: string;
  dateOfBorn: Date;
  phoneNumber: string;
  errorMessage: string;

  minDate = new Date(1900, 1, 1);
  maxDate = new Date();

  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminDashboardService, private toastr: ToastrService,
    private fb: FormBuilder, private tokenService: TokenService) {

    this.form = fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.nullValidator]],
      dateOfBorn: ['', [Validators.nullValidator]]
    })
  }

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
          this.name = this.employee.name;
          this.dateOfBorn = this.employee.dateOfBorn;
          this.phoneNumber = this.employee.phoneNumber;
        }, error => {
          this.errorMessage = error.error.message;
          this.backToList();
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        });
  }

  updateEmployee() {
    this.employee.name = this.name;
    this.employee.dateOfBorn = this.dateOfBorn;
    this.employee.phoneNumber = this.phoneNumber;

    this.adminService.updateUser(this.id, this.employee)
      .subscribe(data => {
        this.toastr.success('Sikeres módosítás!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.backToList();
      }, err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
      );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.updateEmployee();
  }

  backToList() {
    this.router.navigate(['/employees']);
  }

}
