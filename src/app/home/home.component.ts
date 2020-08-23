import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../shared/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userClaims: any;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      localStorage.setItem("CurrentUser", data.name);
    });
    this.userClaims = localStorage.getItem("CurrentUser");
  }

  Logout() {
    localStorage.removeItem("CurrentUser");
    localStorage.removeItem("userToken");
    localStorage.removeItem("GetUserEmail");
    sessionStorage.removeItem("sbdverify");
    sessionStorage.removeItem("rm");
    sessionStorage.removeItem("rm_status");
    sessionStorage.removeItem("cid_client");
    sessionStorage.removeItem("cid_id");
    sessionStorage.removeItem("cid_retffff");
    this.router.navigate(["/verification_login"]);
  }
}
