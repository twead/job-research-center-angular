import { Component, OnInit, ViewChild } from '@angular/core';
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
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

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

  filterValues = {
    title: '',
    city: '',
    type: '',
    payment: '',
    date: ''
  }

  constructor(private tokenService: TokenService, private advertisementService: AdvertisementService,
    private router: Router, private toastr: ToastrService,
    public matDialog: MatDialog, private employerService: EmployerService, private applicationService: ApplicationService) {
  }

  filterForm = new FormGroup({
    title: new FormControl(),
    city: new FormControl(),
    type: new FormControl(),
    payment: new FormControl(),
    date: new FormControl(),
  });

  get title() { return this.filterForm.get('title'); }
  get city() { return this.filterForm.get('city'); }
  get type() { return this.filterForm.get('type'); }
  get payment() { return this.filterForm.get('payment'); }
  get date() { return this.filterForm.get('date'); }


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
    if (this.isEmployee) {
      this.getAllAdvertisement();
      this.getAllMyApplication();
      this.formSubscribe();
      this.getFormsValue();
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
        this.formSubscribe();
        this.getFormsValue();
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

  formSubscribe() {
    this.title.valueChanges.subscribe(titleValue => {
      this.filterValues['title'] = titleValue
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.city.valueChanges.subscribe(cityValue => {
      this.filterValues['city'] = cityValue
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.type.valueChanges.subscribe(typeValue => {
      this.filterValues['type'] = typeValue
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.payment.valueChanges.subscribe(paymentValue => {
      this.filterValues['payment'] = paymentValue
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  getFormsValue() {
    if (this.dataSource) {
      this.dataSource.filterPredicate = (data, filter: string): boolean => {
        let searchString = JSON.parse(filter);
        const resultValue =
          data.title.toString().trim().toLowerCase().indexOf(searchString.title.toLowerCase()) !== -1 &&
          (data.city || '').toString().trim().toLowerCase().indexOf(searchString.city.toLowerCase()) !== -1 &&
          data.type.toString().trim().toLowerCase().indexOf(searchString.type.toLowerCase()) !== -1 &&
          data.payment >= searchString.payment;
        return resultValue;
      }
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
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

  isValid() {
    this.employerService.isValidated(this.email)
      .subscribe(
        data => {
          this.isValidated = data;
        }
      );
  }

}