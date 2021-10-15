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

  uploadImageToStorage(id: number, oldPictureName: string, file: File): Observable<HttpEvent<{}>> {
    this.userFileFolderURL = id + "/images/";
    this.fileURL = this.userFileFolderURL + file.name;
    if (oldPictureName != null) {
      this.deleteImageFromStorage(this.userFileFolderURL, oldPictureName);
    }
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.userURL + 'uploadImage/' + id, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

  uploadPdfToStorage(employerEmail: string, advertisementId: number, employeeEmail: string, file: File) {
    this.userFileFolderURL = employerEmail + "/cv/" + advertisementId + "/" + employeeEmail + "/";
    this.fileURL = this.userFileFolderURL + file.name;
    const storageRef = this.storage.ref(this.fileURL);
    const uploadTask = this.storage.upload(this.fileURL, file);
  }

  deleteImage(id: number, imageName: string): Observable<HttpEvent<{}>> {
    this.userFileFolderURL = id + "/images/";
    this.deleteImageFromStorage(this.userFileFolderURL, imageName);
    const newRequest = new HttpRequest('POST', this.userURL + 'deleteImageName/' + id, {
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