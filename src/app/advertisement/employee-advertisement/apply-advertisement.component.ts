import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TokenService } from 'src/app/service/token.service';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { NewApplication } from 'src/app/dto/new-application';
import { ApplicationService } from 'src/app/service/application.service';
import { AdvertisementDto } from 'src/app/dto/advertisement-dto';
import { UploadFileService } from 'src/app/service/upload-file.service';

@Component({
  selector: 'app-apply-advertisement',
  templateUrl: './apply-advertisement.component.html',
  styleUrls: ['./apply-advertisement.component.css']
})
export class ApplyAdvertisementComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  details: AdvertisementDto;
  newApplication: NewApplication

  advertisemenId: number;
  email: string;
  comment: string;
  cv: File;

  errorMessage: string;
  selectedFiles: FileList;

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private fb: FormBuilder, private tokenService: TokenService, private applicationService: ApplicationService,
    private advertisementService: AdvertisementService, private uploadFileService: UploadFileService) {
    this.form = fb.group({
      comment: ['', [Validators.nullValidator]],
      cv: ['', [
        RxwebValidators.extension({ extensions: ["pdf"] }),
        RxwebValidators.fileSize({ maxSize: 1048576 })
      ]]
    })
  }

  ngOnInit(): void {
    if (this.roleCheck()) {
      this.advertisemenId = this.route.snapshot.params['id'];
      this.email = this.tokenService.getEmail();
      this.getAdvertisement(this.advertisemenId);
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

  getAdvertisement(id: number) {
    this.advertisementService.getAdvertisementDetails(this.advertisemenId).subscribe(
      response => {
        this.details = response;
      },
      error => {
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  addAplication() {
    const currentFileUpload = this.selectedFiles.item(0);
    this.newApplication = new NewApplication(this.details.advertisement.id, this.comment, currentFileUpload.name);
    this.uploadFileService.uploadPdfToStorage(this.details.user.email, this.details.advertisement.id, this.email, currentFileUpload);
    this.applicationService.addApplication(this.email, this.newApplication)
      .subscribe(data => {
        this.router.navigate(['/employee/application/list']);
        this.toastr.success('Jelentkezésedet sikeresen elküldted!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err)
      }
      );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }

  backToAdvertisement(id: number) {
    this.router.navigate(['employee/advertisement/details', id]);
  }

  onSubmit() {
    this.addAplication();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
