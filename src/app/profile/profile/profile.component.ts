import { Component, OnInit } from "@angular/core";
import { profile } from "../../models/profile.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UserService } from "src/app/shared/user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  profileData: profile = {
    project_name: null,
    project_dept: null,
  };

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  submintProfile() {
    this.profileData.project_name;
    this.profileData.project_dept;
    console.log(
      this.profileData.project_name + " TEST " + this.profileData.project_dept
    );

    this.userService
      .sendingProfile(
        this.profileData.project_name,
        this.profileData.project_dept
      )
      .subscribe(
        (data: any) => {
          this.toastr.success("Profile updated successfully...", "...", {
            progressBar: true,
            timeOut: 3000,
          });
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error, "Try again!!", {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
  }
}
