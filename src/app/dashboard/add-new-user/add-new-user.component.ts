import { Component, OnInit } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

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
import { add_New_User } from "../../models/add_New_User.model";

import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: "app-add-new-user",
  templateUrl: "./add-new-user.component.html",
  styleUrls: ["./add-new-user.component.css"],
})
export class AddNewUserComponent implements OnInit {
  AddNewUser_Data: add_New_User = {
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    mobile: null,
  };
  NewUserRegist: any;
  fullListofUser: any;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.ful_listof_users();
  }

  OnaddNewUsersSubmit() {
    this.spinner.show();
    this.userService
      .RegistereSubUSer(
        this.AddNewUser_Data.firstName,
        this.AddNewUser_Data.lastName,
        this.AddNewUser_Data.email,
        this.AddNewUser_Data.username,
        this.AddNewUser_Data.mobile
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.ful_listof_users();
          this.toastr.success("Updated Sucessfully...", "Organization", {
            progressBar: true,
            timeOut: 1500,
          });

        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.toastr.error("Update", "Updated Error... ", {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
  }

  ful_listof_users() {
    this.userService.CurrentUsersList().subscribe(
      (data: any) => {
        this.fullListofUser = data;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error("Update", "Updated Error... ", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }

  EditUser(id) {
    console.log(id, " ID ");
  }

  DeleteUser(id) {
    this.spinner.show();
    this.userService.DeleteUser(id).subscribe(
      (data: any) => {
        this.ful_listof_users();
        this.spinner.hide();
        this.toastr.success("User Deleted Sucessfully...", "User Deleted", {
          progressBar: true,
          timeOut: 2000,
        });
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error("User Delet Error", "User Delet Error... ", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );

  }

  DisabledUser(id){
    this.spinner.show();
    this.userService.DisabledUserService(id).subscribe(
      (data: any) => {
        this.ful_listof_users();
        this.spinner.hide();
        this.toastr.success("User Disabled Sucessfully...", "User Disabled", {
          progressBar: true,
          timeOut: 2000,
        });
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error("User Disabled Error", "User Disabled Error... ", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }

  EnableUser(id){
    this.spinner.show();
    this.userService.EnableUserService(id).subscribe(
      (data: any) => {
        this.ful_listof_users();
        this.spinner.hide();
        this.toastr.success("User Enable Sucessfully...", "User Enable", {
          progressBar: true,
          timeOut: 2000,
        });
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error("User Enable Error", "User Enable Error... ", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }

}
