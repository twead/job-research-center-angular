import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  szakdolgozatEmail = environment.szakdolgozatEmail;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToIndex(){
    this.router.navigate(['']);
  }

}
