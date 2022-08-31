import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Constants } from '../../contants';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('authenticationModal') authenticationModal: ModalDirective;

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) {
    console.log('Constructor LoginComponent');
  }

  ngAfterViewInit(): void {
    this.authenticationModal.show();
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/users']);
    }
  }

  // ngAfterViewInit() {
  //   this.authenticationModal.show();
  // }

  showModal() {
    if (!localStorage.getItem('user')) {
      this.authenticationModal.show();
    }
  }

  login() {
    if (!isNaN(Number(this.username))) {
      this.errorMessage = 'Username / Password is invalid.';
      return;
    }
    this.auth.authenticate(this.username, this.password).subscribe(data => {
      if (!localStorage.getItem('user')) {
        this.errorMessage = 'Username / Password is invalid.';
      } else {
        this.router.navigate(['/users']);
      }
    },
      error => {
        this.errorMessage = Constants.INTERNAL_SERVER_ERROR;
      }
    )
  }

  clearFormData() {
    this.errorMessage = "";
    this.password = "";
  }
}