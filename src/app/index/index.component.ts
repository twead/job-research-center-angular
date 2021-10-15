import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Advertisement } from '../model/advertisement';
import { AdvertisementService } from '../service/advertisement.service';
import { TokenService } from '../service/token.service';
import { NumberOfRecords } from '../dto/number-of-records';
import { EmployerService } from '../service/employer.service';
import { ApplicationService } from '../service/application.service';
import { ApplicationDto } from '../dto/application-dto';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isAdmin = false;
  isEmployee = false;
  isEmployer = false;
  isValidated = false;
  storageURL = environment.storageURL;
  szakdolgozatEmail = environment.szakdolgozatEmail;
  imagePath: string;
  email: string;
  advertisements: Array<Advertisement> = [];
  applications: Array<ApplicationDto> = [];
  numberOfRecords: NumberOfRecords;
  existData = true;

  displayedColumns: string[] = ['title', 'city', 'type', 'payment', 'dateOfUpload', 'action', 'applied'];
  dataSource: MatTableDataSource<any>;
  errorMessage: string;

  constructor(private tokenService: TokenService, private advertisementService: AdvertisementService,
    private router: Router, private toastr: ToastrService,
    public matDialog: MatDialog, private employerService: EmployerService, private applicationService: ApplicationService, formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.email = this.tokenService.getEmail();
    this.isAdmin = this.tokenService.IsAdmin();
    this.isEmployee = this.tokenService.IsEmployee();
    this.isEmployer = this.tokenService.IsEmployer();
    this.imagePath = this.storageURL + "admin.jpg?alt=media"
    if (!this.email) {
      this.getNumberOfRecords();
    }
    if (this.isEmployer) {
      this.isValid();
    }
  }

  ngAfterViewInit(): void {
    if (this.isEmployee) {
      this.getAllAdvertisement();
      this.getAllMyApplication();
      this.dataSource = new MatTableDataSource(this.advertisements);
    }
  }

  getNumberOfRecords() {
    this.advertisementService.getNumberOfRecords().subscribe(
      response => {
        this.numberOfRecords = response;
      }
    );
  }

  getAllAdvertisement() {
    this.advertisementService.getAllAdvertisement().subscribe(
      response => {
        this.advertisements = response;
        if (this.advertisements.length == 0) {
          this.existData = false;
        }
        this.dataSource = new MatTableDataSource(this.advertisements);
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
          result = true;
        }
      });
      return result;
    } else
      return result;
  }

  getAdvertisementDetails(id: number) {
    this.router.navigate(['employee/advertisement/details', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }






  isValid() {
    this.employerService.isValidated(this.email)
      .subscribe(
        data => {
          this.isValidated = data;
        }
      );
  }

}