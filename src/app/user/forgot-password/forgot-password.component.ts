import { Component, OnInit } from '@angular/core';


import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserService } from "../../shared/user.service";
import { Router, NavigationStart } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { reSendVerifyEmail } from "../../models/reSendVerifyEmail.model";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  reSendEmail: reSendVerifyEmail = {
    email: null,
  };

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}


  ngOnInit() {
  }


  OnVerifyEmail() {
    let email = this.reSendEmail.email;
    let _this = this;

    this.toastr.info(
      "If you don’t see it in your inbox, please check your spam folder",
      "Please wait..",
      {
        timeOut: 3000,
      }
    );
    this.userService.forgot_password_API(email).subscribe(
      (data: any) => {
        this.toastr.success(
          "If you don’t see it in your inbox, please check your spam folder",
          "We have sent password rest mail",
          {
            progressBar: true,
            timeOut: 4000,
          }
        );

        setTimeout(function () {
          _this.router.navigate(["/login"]);
        }, 3500);


      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.error, " Try again!!", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }

}
