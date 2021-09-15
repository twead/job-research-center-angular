import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';
import { MatModalComponent } from 'src/app/mat-modal/mat-modal.component';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements AfterViewInit {

  employers: Array<User> = [];
  displayedColumns: string[] = ['name', 'email', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  errorMessage: string;

  constructor(private adminService: AdminDashboardService, private router: Router,
    private toastr: ToastrService, public matDialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.getEmployers();
    this.dataSource = new MatTableDataSource(this.employers);
  }

  getEmployers() {
    this.adminService.getAllEmployer().subscribe(
      response => {
        this.employers = response;
        this.dataSource = new MatTableDataSource(this.employers);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmployerDetails(id: number) {
    this.router.navigate(['employer/details', id]);
  }

  updateEmployer(id: number) {
    this.router.navigate(['employer/update', id]);
  }

  setValidationToEmployer(id: number, email: string) {

    const dialogRef = this.matDialog.open(MatModalComponent, {
      width: '300px',
      data: {
        title: "Álláshirdető engedélyezése:  (Figyelem: Nem visszavonható!)",
        paragraph: email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.adminService.setValidationToEmployer(id)
          .subscribe(
            data => {
              this.toastr.success('Felhasználó engedélyezve!', 'OK', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
              this.getEmployers();
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

  deleteEmployer(id: number, email: string) {

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
              this.getEmployers();
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

}
