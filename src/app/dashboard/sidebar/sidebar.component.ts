import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../shared/user.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  // Logout() {
  //   localStorage.removeItem("userToken");
  //   localStorage.removeItem("GetUserEmail");
  //   this.router.navigate(["/login"]);
  // }
}
