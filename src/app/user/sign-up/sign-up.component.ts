import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService,private http: HttpClient) { }

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      enabled: '',
      username: ''
    }
  }

  getadminTokenToRigisterUser() {
    console.log("LOT 2");
    var data = "client_id=autointelliClientID&username=admin&password=testing&grant_type=client_credentials&grant_type=client_credentials&client_secret=541ac339-cf0e-44b1-b6bc-685ab037cf6c";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.http.post("http://localhost:8088/auth/realms/autointelli/protocol/openid-connect/token", data, { headers: reqHeader })
      .subscribe((data: any) => {
        localStorage.setItem("superUserAccess_token", data.access_token);
      })
  }


}
