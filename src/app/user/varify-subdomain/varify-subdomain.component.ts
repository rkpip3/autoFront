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
import { sub_domains } from "../../models/verify_sub_domain.model";

@Component({
  selector: "app-varify-subdomain",
  templateUrl: "./varify-subdomain.component.html",
  styleUrls: ["./varify-subdomain.component.css"],
})
export class VarifySubdomainComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  sub_domains_model: sub_domains = {
    verify_sub_domains: null,
  };
  NewUserRegist: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  OnSubmitd() {
    console.log(this.sub_domains_model.verify_sub_domains, " ddddd");

    this.userService
      .subdomainVerify(this.sub_domains_model.verify_sub_domains)
      .subscribe(
        (data: any) => {
          sessionStorage.setItem("sbdverify", data.rm_status);

          sessionStorage.setItem("rm",data.rm);
          sessionStorage.setItem("rm_status",data.rm_status);
          sessionStorage.setItem("cid_client",data.cid_client);
          sessionStorage.setItem("cid_id", data.cid_id);
          sessionStorage.setItem("cid_retffff",data.cid_retffff);

          this.router.navigate(["/login"]);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error("Subdomain not found", "please try again", {
            progressBar: true,
            timeOut: 3000,
          });
          sessionStorage.setItem("sbdverify", "false");
          this.router.navigate(["/verification_login"]);
        }
      );
  }

}
