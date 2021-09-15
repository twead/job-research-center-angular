import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employer-update',
  templateUrl: './employer-update.component.html',
  styleUrls: ['./employer-update.component.css']
})
export class EmployerUpdateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  id: number;
  employer: User;
  email: string;
  name: string;
  dateOfBorn: Date;
  phoneNumber: string;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminDashboardService, private toastr: ToastrService, private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.nullValidator]],
      dateOfBorn: ['', [Validators.nullValidator]]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.adminService.getUserById(this.id)
      .subscribe(
        data => {
          this.employer = data;
          this.name = this.employer.name;
          this.dateOfBorn = this.employer.dateOfBorn;
          this.phoneNumber = this.employer.phoneNumber;
        }, error => {
          this.errorMessage = error.error.message;
          this.backToList();
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        });
  }
  get f() {
    return this.form.controls;
  }

  updateEmployer() {
    this.employer.name = this.name;
    this.employer.dateOfBorn = this.dateOfBorn;
    this.employer.phoneNumber = this.phoneNumber;

    this.adminService.updateUser(this.id, this.employer)
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

  onSubmit() {
    this.updateEmployer();
  }

  backToList() {
    this.router.navigate(['/employers']);
  }

}
