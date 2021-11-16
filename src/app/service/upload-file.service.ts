import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  userURL = environment.userURL;
  fileURL: string;
  userFileFolderURL: string;
  oldPictureName: string;
  fileName: string;

  constructor(private https: HttpClient, private storage: AngularFireStorage) { }

  uploadImageToStorage(id: number, email: string, oldPictureName: string, file: File): Observable<HttpEvent<{}>> {
    this.userFileFolderURL = id + "/images/";
    this.fileURL = this.userFileFolderURL + file.name;
    if (oldPictureName != null) {
      this.deleteImageFromStorage(this.userFileFolderURL, oldPictureName);
    }
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.userURL + 'uploadImage/' + email, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

  uploadPdfToStorage(employerId: number, advertisementId: number, employeeId: number, key: string, file: File) {
    this.userFileFolderURL = employerId + "/cv/" + advertisementId + "/" + employeeId + "/" + key + "/";
    this.fileURL = this.userFileFolderURL + file.name;
    const storageRef = this.storage.ref(this.fileURL);
    const uploadTask = this.storage.upload(this.fileURL, file);
  }

  deleteImage(id: number, email: string, imageName: string): Observable<HttpEvent<{}>> {
    this.userFileFolderURL = id + "/images/";
    this.deleteImageFromStorage(this.userFileFolderURL, imageName);
    const newRequest = new HttpRequest('POST', this.userURL + 'deleteImageName/' + email, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

  private deleteImageFromStorage(basePath: string, imageName: string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(imageName).delete();
  }

}