import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Loginuser } from "../../models/loginuser.model";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;
  isUserDisabled: boolean = false;
  LoginMsg:any
  login: Loginuser = {
    UserName: null,
    Password: null,
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  OnSubmit(userName, password) {
    this.userService
      .userAuthentication(this.login.UserName, this.login.Password)
      .subscribe(
        (data: any) => {
          var checkFirstTimeLogin = data.isFirstTimeLogin;

          var GetUserToken = data.LoginRes.access_token;
          var GetUserEmail = data.email;

          if (GetUserToken != "undefined" && GetUserToken != undefined) {
            localStorage.setItem("GetUserEmail", GetUserEmail);
            localStorage.setItem("userToken", GetUserToken);
          } else {
            console.log("check your email/password");
            this.toastr.error(
              "Try again!!",
              "Please enter a valid email address/ password",
              {
                progressBar: true,
                timeOut: 3000,
              }
            );
          }

          if (checkFirstTimeLogin == false) {
            this.router.navigate(["/home"]);
          } else {
            this.router.navigate(["/profile"]);
          }
        },
        (err: HttpErrorResponse) => {

          if (err.status == 400){
            this.LoginMsg = err.error.status.error_description;
            this.isUserDisabled = true;
          }else{
            this.isLoginError = true;
          }
        }
      );
  }
}
