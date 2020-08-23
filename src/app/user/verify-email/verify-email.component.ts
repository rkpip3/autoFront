import { Component, OnInit } from "@angular/core";
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
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"],
})
export class VerifyEmailComponent implements OnInit {
  showHideEmail: boolean = false;

  reSendEmail: reSendVerifyEmail = {
    email: null,
  };

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  ShowInpuforEmailVerification() {
    if (this.showHideEmail == false) {
      this.showHideEmail = true;
    } else {
      this.showHideEmail = false;
    }
  }

  OnVerifyEmail() {
    let email = this.reSendEmail.email;
    this.toastr.info(
      "Setting up your trial",
      "This may take a few moments, but will ultimately be worth it.",
      {
        timeOut: 3000,
      }
    );
    this.userService.resend_verification_email_API(email).subscribe(
      (data: any) => {
        this.toastr.success(
          "If you don’t see it in your inbox, please check your spam folder",
          "We sent your verification email",
          {
            progressBar: true,
            timeOut: 4000,
          }
        );
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
