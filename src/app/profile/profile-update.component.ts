import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { UserProfileService } from '../service/user-profile.service';
import { TokenService } from '../service/token.service';
import { UploadFileService } from '../service/upload-file.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { PasswordValidation } from '../validation/password-validation';
import { UpdateEmailDto } from '../dto/update-email-dto';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  imageForm: FormGroup = new FormGroup({});
  emailForm: FormGroup = new FormGroup({});

  updateProfile: User;
  isEmployer = false;
  errorMessage: string;
  userURL = environment.userURL;
  storageURL = environment.storageURL;
  imagePath: string;
  selectedFiles: FileList;
  isRedirect = true;

  email: string;
  name: string;
  address: string;
  dateOfBorn: Date;
  phoneNumber: string;
  picture: string;
  loginVerification: boolean;

  changeEmail: string;
  confirmChangeEmail: string;
  updateEmail: UpdateEmailDto;

  minDate = new Date(1900, 1, 1);
  maxDate = new Date();

  constructor(private tokenService: TokenService, private userProfileService: UserProfileService,
    private toastr: ToastrService, private router: Router, private https: HttpClient,
    private fb: FormBuilder, private uploadService: UploadFileService) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.nullValidator]],
      dateOfBorn: ['', [Validators.nullValidator]],
      loginVerification: ['', [Validators.nullValidator]]
    }),
      this.imageForm = fb.group({
        profilePhoto: ['', [
          RxwebValidators.extension({ extensions: ["jpeg", "gif", "jpg", "gif"] }),
          RxwebValidators.fileSize({ maxSize: 1048576 })
        ]]
      }),
      this.emailForm = fb.group({
        changeEmail: ['', [Validators.required]],
        confirmChangeEmail: ['', [Validators.required]]
      }, {
        validator: PasswordValidation('changeEmail', 'confirmChangeEmail')
      })
  }

  get f() {
    return this.form.controls;
  }

  get ef() {
    return this.emailForm.controls;
  }

  submit() {
    console.log(this.form.value);
  }

  onChangeEmail() {
    this.updateEmail = new UpdateEmailDto(this.changeEmail);
    this.userProfileService.updateEmail(this.email, this.updateEmail).subscribe(data => {
      this.toastr.success('Kérlek igazold vissza az új email címedet!', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.backToProfile();
    }, err => {
      this.errorMessage = err.error.message;
      this.toastr.error(this.errorMessage, 'Hiba!', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      console.log(err)
    }
    );
  }

  ngOnInit(): void {
    this.updateProfile = new User();
    this.email = this.tokenService.getEmail();
    this.isEmployer = this.tokenService.IsEmployer();

    this.userProfileService.getProfileDetails(this.email)
      .subscribe(data => {
        this.updateProfile = data;
        this.name = this.updateProfile.name;
        this.email = this.updateProfile.email;
        this.dateOfBorn = this.updateProfile.dateOfBorn;
        this.phoneNumber = this.updateProfile.phoneNumber;
        this.loginVerification = this.updateProfile.loginVerification;
        if (this.isEmployer == true) {
          this.picture = this.updateProfile.employer.picture;
          this.imagePath = this.storageURL + this.updateProfile.id + '%2Fimages%2F' + this.picture + "?alt=media";
        }
      }, error => console.log(error));

  }

  editProfile() {
    this.updateProfile.name = this.name;
    this.updateProfile.email = this.email;
    this.updateProfile.dateOfBorn = this.dateOfBorn;
    this.updateProfile.phoneNumber = this.phoneNumber;
    this.updateProfile.loginVerification = this.loginVerification;
    if (this.isEmployer == true) {
      this.picture = this.updateProfile.employer.picture;
      this.imagePath = this.storageURL + this.updateProfile.id + '%2Fimages%2F' + this.picture + "?alt=media";
    }

    this.userProfileService.updateProfile(this.email, this.updateProfile)
      .subscribe(data => {
        this.toastr.success('Profilodat sikeresen módosítottad!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.backToProfile();
      }, err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err)
      }
      );
  }

  uploadImage() {
    const currentFileUpload = this.selectedFiles.item(0);
    this.picture = this.updateProfile.employer.picture;
    this.uploadService.uploadImageToStorage(this.updateProfile.id, this.picture, currentFileUpload).subscribe(event => {
      this.selectedFiles = undefined;
    });;
    this.backToProfile();
    this.toastr.success('Profilképedet sikeresen módosítottad!', 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }

  deleteImage() {
    this.uploadService.deleteImage(this.updateProfile.id, this.picture).subscribe(res => {
      this.picture = null;
    });
  }

  onSubmit() {
    this.editProfile();
  }

  backToProfile() {
    this.router.navigate(['/profile']);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  reload(){
    window.location.reload();
  }




}