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
import { Createnewuser } from "../../models/CreateNewUser.model";

@Component({
  selector: "app-create-new-user",
  templateUrl: "./create-new-user.component.html",
  styleUrls: ["./create-new-user.component.css"],
})
export class CreateNewUserComponent implements OnInit {
  isRegisterSucess: boolean = false;

  createnew: Createnewuser = {
    email: null,
    username: null,
    firstname: null,
    lastname: null,
    phonenumber: null,
    companyname: null,
    noofemp: null,
    autointelliSubdomain: null,
    password: null,
  };

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  getadminTokenToRigisterUser() {
    var data =
      "client_id=autointelliClientID&username=admin&password=testing&grant_type=client_credentials&grant_type=client_credentials&client_secret=541ac339-cf0e-44b1-b6bc-685ab037cf6c";
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    this.http
      .post(
        "http://localhost:8088/auth/realms/autointelli/protocol/openid-connect/token",
        data,
        { headers: reqHeader }
      )
      .subscribe((data: any) => {
        localStorage.setItem("superUserAccess_token", data.access_token);
      });
  }

  OnCreateNewUserFormSubmit() {
    this.toastr.info(
      "Please wait...",
      "This may take a few moments, but will ultimately be worth it..",
      {
        progressBar: true,
        timeOut: 5000,
      }
    );

    let _this = this;
    let email = this.createnew.email;
    let username = this.createnew.username;
    let firstname = this.createnew.firstname;
    let lastname = this.createnew.lastname;
    let phonenumber = this.createnew.phonenumber;
    let companyname = this.createnew.companyname;
    let noofemp = this.createnew.noofemp;
    let autointelliSubdomain = this.createnew.autointelliSubdomain;
    let password = this.createnew.password;

    _this.userService
      .registerUser(
        email,
        username,
        firstname,
        lastname,
        phonenumber,
        companyname,
        noofemp,
        autointelliSubdomain,
        password
      )
      .subscribe(
        (data: any) => {
          _this.toastr.success("You have sucessfully registered...", "Registration completed", {
            progressBar: true,
            timeOut: 1500,
          });

          setTimeout(function () {
            _this.router.navigate(["/email-verify"]);
          }, 2000);
        },
        (err: HttpErrorResponse) => {
          _this.toastr.error("Please conect with support team", "Try again!!", {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
  } // end

  // OnCreateNewUserFormSubmit() {
  //   this.getadminTokenToRigisterUser();
  //   let _this = this;
  //   let email = this.createnew.email;
  //   let username = this.createnew.username;
  //   let firstname = this.createnew.firstname;
  //   let lastname = this.createnew.lastname;
  //   let phonenumber = this.createnew.phonenumber;
  //   let companyname = this.createnew.companyname;
  //   let noofemp = this.createnew.noofemp;
  //   let autointelliSubdomain = this.createnew.autointelliSubdomain;
  //   let password = this.createnew.password;

  //   setTimeout(function () {
  //     _this.userService
  //       .registerUser(
  //         email,
  //         username,
  //         firstname,
  //         lastname,
  //         phonenumber,
  //         companyname,
  //         noofemp,
  //         autointelliSubdomain,
  //         password
  //       )
  //       .subscribe(
  //         (data: any) => {
  //           console.log(data + " User Created sucessfully");
  //           _this.isRegisterSucess = true;

  //           localStorage.removeItem("superUserAccess_token");

  //           _this.toastr.success(
  //             "You have sucessfully registered...",
  //             "redirecting to login",
  //             {
  //               progressBar: true,
  //               timeOut: 1000,
  //             }
  //           );

  //           setTimeout(function () {
  //             _this.router.navigate(["/home"]);
  //           }, 3000);

  //         },
  //         (err: HttpErrorResponse) => {
  //           console.log(err, " User Creation error 1");
  //           console.log(err.error, " User Creation error 2");
  //           console.log(err.error.errorMessage, " User Creation error 3");

  //           _this.toastr.error(
  //             "User exists with same username/email",
  //             "Enter New username/email",
  //             {
  //               progressBar: true,
  //               timeOut: 3000,
  //             }
  //           );

  //         }
  //       );
  //   }, 1000);

  // } // end
}
