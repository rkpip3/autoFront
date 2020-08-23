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
import { addDept } from "../../models/adddept.model";
import { EditDeptData } from "../../models/EditDepart.model";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.css"],
})
export class DepartmentComponent implements OnInit {
  AddDept: addDept = {
    org_seleted: null,
    DeptID: null,
    DeptName: null,
    Description: null,
    Organization: null,
    org: null,
  };

  edit_dept_data: EditDeptData = {
    id: null,
    org_seleted: null,
    DeptID: null,
    DeptName: null,
    Description: null,
    Organization: null,
    org: null,
  };

  deptInfo: any;
  orgInfo: any;
  Deprt_EditData: any;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getDeptData();
    this.getOrgData();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  closemodel() {
    let content = "Cross click";
    this.modalService.dismissAll(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  EditDeptFn(id) {
    this.userService.EditDepart(id).subscribe((data: any) => {
      this.Deprt_EditData = data;
      this.edit_dept_data.id = this.Deprt_EditData.id;
      this.edit_dept_data.DeptID = this.Deprt_EditData.DeptID;
      this.edit_dept_data.DeptName = this.Deprt_EditData.DeptName;
      this.edit_dept_data.Description = this.Deprt_EditData.Description;
      this.edit_dept_data.Organization = this.Deprt_EditData.Organization;
    });
  }

  EditDeptFormDataSubmit() {
    this.userService
      .UpdateDepart(
        this.edit_dept_data.id,
        this.edit_dept_data.DeptID,
        this.edit_dept_data.DeptName,
        this.edit_dept_data.Description,
        this.edit_dept_data.Organization,
        this.AddDept.org
      )
      .subscribe(
        (data: any) => {
          this.toastr.success("Updated Sucessfully...", "Organization", {
            progressBar: true,
            timeOut: 1500,
          });
          this.closemodel();
          this.getDeptData();
          this.getOrgData();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error("Update", "Updated Error... ", {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
  }

  DeleteDept(id) {
    this.userService.DeleteDepartment(id).subscribe((data: any) => {
      this.getDeptData();
      this.getOrgData();
      this.toastr.success("Deleted..", "Deleted Sucessfully...", {
        progressBar: true,
        timeOut: 1500,
      });
    });
  }

  getOrgData() {
    this.userService.getOrg().subscribe((data: any) => {
      this.orgInfo = data.organization;
    });
  }

  getDeptData() {
    this.userService.getDept().subscribe((data: any) => {
      this.deptInfo = data;
    });
  }

  OnaddDeptSubmit() {
    let org_seleted = this.AddDept.org_seleted;
    let DeptID = this.AddDept.DeptID;
    let DeptName = this.AddDept.DeptName;
    let Description = this.AddDept.Description;
    let Organization = this.AddDept.Organization;
    let org = this.AddDept.org;

    this.userService
      .AddDept(org_seleted, DeptID, DeptName, Description, Organization, org)
      .subscribe(
        (data: any) => {
          this.toastr.success(
            "Created Organization Sucessfully...",
            "Organization",
            {
              progressBar: true,
              timeOut: 1500,
            }
          );
          this.getDeptData();
          this.getOrgData();
          console.log(data, " ord Data 1");
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
