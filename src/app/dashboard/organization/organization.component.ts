import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
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
import { addOrganization } from "../../models/addorganization.model";
import { EditORGData } from "../../models/EditOrganization.model";

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.css"],
})
export class OrganizationComponent implements OnInit {
  closeResult = "";

  AddOrganization: addOrganization = {
    OrganizationID: null,
    OrganizationName: null,
    Description: null,
  };

  editOrgForm: EditORGData = {
    Edit_ID: null,
    Edit_OrganizationID: null,
    Edit_OrganizationName: null,
    Edit_Description: null,
  };

  orgInfo: any;
  orgDelete: any;
  orgEdit: any;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
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

  deleteOrg(id) {
    console.log(id, " delete is fire");
    this.userService.getDelete(id).subscribe((data: any) => {
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

  EditOrgFn(id) {
    this.userService.editOrg(id).subscribe((data: any) => {
      this.orgEdit = data;
      this.editOrgForm.Edit_ID = this.orgEdit.id;
      this.editOrgForm.Edit_OrganizationID = this.orgEdit.OrganizationID;
      this.editOrgForm.Edit_OrganizationName = this.orgEdit.OrganizationName;
      this.editOrgForm.Edit_Description = this.orgEdit.Description;
    });
  }

  EditOrgFormDataSubmit() {
    this.spinner.show();
    this.userService
      .UpdateOrg(
        this.editOrgForm.Edit_ID,
        this.editOrgForm.Edit_OrganizationID,
        this.editOrgForm.Edit_OrganizationName,
        this.editOrgForm.Edit_Description,
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.toastr.success("Updated Sucessfully...", "Organization", {
            progressBar: true,
            timeOut: 1500,
          });
          this.closemodel();
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

  OnaddOrganizationSubmit() {
    this.spinner.show();
    let OrganizationID = this.AddOrganization.OrganizationID;
    let OrganizationName = this.AddOrganization.OrganizationName;
    let Description = this.AddOrganization.Description;

    this.userService
      .AddOrg(OrganizationID, OrganizationName, Description)
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.toastr.success(
            "Created Organization Sucessfully...",
            "Organization",
            {
              progressBar: true,
              timeOut: 1500,
            }
          );
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
