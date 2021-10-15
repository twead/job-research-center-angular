import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Advertisement } from '../../model/advertisement';
import { AdvertisementService } from '../../service/advertisement.service';
import { TokenService } from '../../service/token.service';
import { EmployerService } from '../../service/employer.service';
import { ApplicationService } from '../../service/application.service';
import { ApplicationAndEmployeeDto } from 'src/app/dto/application-and-employee-dto';
import { RequestDto } from 'src/app/dto/request-dto';
import { MatModalComponent } from 'src/app/mat-modal/mat-modal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-details-my-advertisement',
  templateUrl: './details-my-advertisement.component.html',
  styleUrls: ['./details-my-advertisement.component.css']
})
export class DetailsMyAdvertisementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['name', 'email', 'dateOfApplication', 'actions'];
  activeSource: MatTableDataSource<any>;
  deletedSource: MatTableDataSource<any>;

  id: number;
  email: string;
  numberOfActiveApplication: number;
  numberOfDeletedApplication: number;
  advertisement: Advertisement;
  applications: Array<ApplicationAndEmployeeDto> = [];
  activeApplications: Array<ApplicationAndEmployeeDto> = [];
  deletedApplications: Array<ApplicationAndEmployeeDto> = [];
  advertisementIdDto: RequestDto;
  existActiveData = true;
  existDeletedData = true;
  isValidated: boolean;
  errorMessage: string;


  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private advertisementService: AdvertisementService, private applicationService: ApplicationService, private tokenService: TokenService,
    private employerService: EmployerService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.email = this.tokenService.getEmail();
    if (this.roleCheck()) {
      this.isValid();
    }
    this.getMyAdvertisement();
  }

  ngAfterViewInit(): void {
    this.activeSource = new MatTableDataSource(this.activeApplications);
    this.deletedSource = new MatTableDataSource(this.deletedApplications);
  }

  roleCheck() {
    if (this.tokenService.IsEmployer()) {
      return true;
    } else {
      this.router.navigate(['']);
      this.toastr.error('Nincs megfelelő jogosultságod!', 'Hiba!', {
        timeOut: 3000, positionClass: 'toast-top-center',
      }
      );
      return false;
    }
  }
  isValid() {
    this.employerService.isValidated(this.email)
      .subscribe(
        data => {
          this.isValidated = data;
          if (!this.isValidated) {
            this.router.navigate(['']);
            this.toastr.error('Nincs megfelelő jogosultságod!', 'Hiba!', {
              timeOut: 3000, positionClass: 'toast-top-center',
            }
            );
          }
        });
  }
  getMyAdvertisement() {
    this.advertisementIdDto = new RequestDto();
    this.advertisementIdDto.id = this.id;
    this.advertisementService.getMyAdvertisement(this.email, this.advertisementIdDto).subscribe(
      response => {
        this.advertisement = response;

        if (!this.advertisement) {
          this.router.navigate(['employer/advertisement/list']);
          this.toastr.error('Nincs megfelelő jogosultságod!', 'Hiba!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
        this.id = this.advertisement.id;
        this.getAllApplicationAndEmployee();
      },
      error => {
        this.errorMessage = error.error.message;
        this.router.navigate(['employer/advertisement/list']);
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  getAllApplicationAndEmployee() {
    this.applicationService.getAllApplicationAndEmployee(this.id).subscribe(
      response => {
        this.applications = response;
        this.applications.forEach(row=>{
          if(row.application.available)
           this.activeApplications.push(row);
          else
          this.deletedApplications.push(row);
        })
        this.numberOfActiveApplication = this.activeApplications.length;
        this.numberOfDeletedApplication = this.deletedApplications.length;
        this.activeSource = new MatTableDataSource(this.activeApplications);
        this.deletedSource = new MatTableDataSource(this.deletedApplications);
        this.activeSource.paginator = this.paginator;
        this.activeSource.sort = this.sort;
        this.deletedSource.paginator = this.paginator;
        this.deletedSource.sort = this.sort;
        if (this.activeApplications.length == 0) 
          this.existActiveData = false;
          if (this.deletedApplications.length == 0) 
          this.existDeletedData = false;
        
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
    this.activeSource.filter = filterValue.trim().toLowerCase();
    this.deletedSource.filter = filterValue.trim().toLowerCase();

    if (this.activeSource.paginator) {
      this.activeSource.paginator.firstPage();
    }
    if (this.deletedSource.paginator) {
      this.deletedSource.paginator.firstPage();
    }
  }

  sendMessage(id: number) {
    this.router.navigate(['new_message', id]);
  }

  editAdvertisement(id: number) {
    this.router.navigate(["employer/advertisement/update", id]);
  }

  applicationDetails(id: number) {
    this.router.navigate(["employer/application/details", id]);
  }

  deleteAdvertisement(id: number, advertisementTitle: string) {
    const dialogRef = this.matDialog.open(MatModalComponent, {
      width: '300px',
      data: {
        title: "Hirdetés törlése: ",
        paragraph: advertisementTitle
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.advertisementService.deleteAdvertisement(id)
          .subscribe(
            data => {
              this.toastr.success('Álláshirdetés sikeresen törölve!', 'OK', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
              this.backToList();
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

  deleteApplication(id: number, employeeName: string) {
    const dialogRef = this.matDialog.open(MatModalComponent, {
      width: '300px',
      data: {
        title: "Jelentkezés törlése:",
        paragraph: employeeName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.applicationService.deleteApplication(id)
          .subscribe(
            data => {
              this.toastr.success('Állásjelentkezés sikeresen törölve!', 'OK', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
              window.location.reload();
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

  backToList() {
    this.router.navigate(["employer/advertisement/list"])
  }

  backToDeletedList(){
    this.router.navigate(["employer/advertisement/deleted/list"])
  }

}