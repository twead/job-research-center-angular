import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { MatModalComponent } from 'src/app/mat-modal/mat-modal.component';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  employees: Array<User> = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;
  errorMessage: string;

  constructor(private adminService: AdminDashboardService, private router: Router,
    private toastr: ToastrService, public matDialog: MatDialog,
    private tokenService: TokenService) {
    ;
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.roleCheck()) {
      this.getEmployees();
      this.dataSource = new MatTableDataSource(this.employees);
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

  getEmployees() {
    this.adminService.getAllEmployee().subscribe(
      response => {
        this.employees = response;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  getEmployeeDetails(id: number) {
    this.router.navigate(['employee/details', id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(['employee/update', id]);
  }

  deleteEmployee(id: number, email: string) {

    const dialogRef = this.matDialog.open(MatModalComponent, {
      width: '300px',
      data: {
        title: "Felhasználó törlése:",
        paragraph: email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.adminService.deleteUser(id)
          .subscribe(
            data => {
              this.toastr.success('Felhasználó sikeresen törölve!', 'OK', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
              this.getEmployees();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
