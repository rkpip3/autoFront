import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../shared/user.service";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {

   }

  // Logout() {
  //   localStorage.removeItem("userToken");
  //   localStorage.removeItem("GetUserEmail");
  //   this.router.navigate(["/login"]);
  // }

}
