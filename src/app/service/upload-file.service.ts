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
  imageURL: string;
  userImageFolderURL: string;
  oldPictureName: string;
  imageName: string;

  constructor(private https: HttpClient, private storage: AngularFireStorage) { }

  uploadImageToStorage(email: string, oldPictureName: string, file: File): Observable<HttpEvent<{}>> {
    this.userImageFolderURL = email + "/images/";
    this.imageURL = this.userImageFolderURL + file.name;
    if (oldPictureName != null) {
      this.deleteImageFromStorage(this.userImageFolderURL, oldPictureName);
    }
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.userURL + 'uploadImage/' + email, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

  deleteImage(email: string, imageName: string): Observable<HttpEvent<{}>> {
    this.userImageFolderURL = email + "/images/";
    this.deleteImageFromStorage(this.userImageFolderURL, imageName);
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