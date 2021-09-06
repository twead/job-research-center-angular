import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { UserGuardService } from '../guard/user-guard.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  email: string;
  role: boolean;
  role2: string;

  constructor(private tokenService: TokenService,private userService: UserGuardService) { }

  ngOnInit(): void {
    this.email = this.tokenService.getEmail();
  }

}