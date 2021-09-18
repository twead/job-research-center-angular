import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isAdmin = false;
  storageURL = environment.storageURL;
  imagePath: string;
  email: string;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.email = this.tokenService.getEmail();
    this.isAdmin = this.tokenService.IsAdmin();
    this.imagePath = this.storageURL + "admin.jpg?alt=media"
  }

}