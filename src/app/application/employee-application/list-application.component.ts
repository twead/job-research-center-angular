import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdvertisementService } from '../../service/advertisement.service';
import { TokenService } from '../../service/token.service';
import { EmployerService } from '../../service/employer.service';
import { ApplicationService } from 'src/app/service/application.service';
import { ApplicationDto } from 'src/app/dto/application-dto';

@Component({
  selector: 'app-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.css']
})
export class ListApplicationComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  isEmployee = false;
  email: string;
  applications: Array<ApplicationDto> = [];

  displayedColumns: string[] = ['title', 'city', 'type', 'payment', 'dateOfApplication', 'action'];
  dataSource: MatTableDataSource<any>;
  errorMessage: string;

  constructor(private tokenService: TokenService, private advertisementService: AdvertisementService,
    private router: Router, private toastr: ToastrService,
    public matDialog: MatDialog, private employerService: EmployerService,
    private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    if (this.roleCheck()) {
      this.email = this.tokenService.getEmail();
      this.getAllMyApplication();
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

  getAllMyApplication() {
    this.applicationService.getAllMyApplication(this.email).subscribe(
      response => {
        this.applications = response;
        this.dataSource = new MatTableDataSource(this.applications);
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

  getAdvertisementDetails(id: number) {
    this.router.navigate(['employee/application/details', id]);
  }

}
