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
import { addProject } from "../../models/addProject.model";
import { addDept } from "../../models/adddept.model";

import { EditProjectData } from "../../models/EditProjectmodel";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
  addProject_data: addProject = {
    id: null,
    projectName: null,
    description: null,
    department: null,
  };

  EditProject_Data: EditProjectData = {
    id: null,
    projectName: null,
    description: null,
    department: null,
  };

  AddDept: addDept = {
    org_seleted: null,
    DeptID: null,
    DeptName: null,
    Description: null,
    Organization: null,
    org: null,
  };

  ProjectInfo: any;
  orgInfo: any;
  Project_EditData: any;
  deptInfo: any;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getProjectData();
    this.getDeptData();
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

  getProjectData() {
    this.userService.getpProject().subscribe((data: any) => {
      this.ProjectInfo = data;
    });
  }

  getDeptData() {
    this.userService.getDept().subscribe((data: any) => {
      this.deptInfo = data;
    });
  }

  OnAddProjectSubmit() {
    this.userService
      .AddProjectS(
        this.addProject_data.projectName,
        this.addProject_data.description,
        this.addProject_data.department
      )
      .subscribe(
        (data: any) => {
          this.toastr.success("Created Project Sucessfully...", "Project", {
            progressBar: true,
            timeOut: 1500,
          });
          this.getProjectData();
          this.getDeptData();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error, "Try again!!", {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
  }

  DeleteProject(id) {
    this.userService.DeleteProjects(id).subscribe((data: any) => {
      this.getProjectData();
      this.getDeptData();
      this.toastr.success("Deleted..", "Deleted Sucessfully...", {
        progressBar: true,
        timeOut: 1500,
      });
    });
  }

  EditProjectFn(id) {
    this.userService.ProjectDetailsView(id).subscribe((data: any) => {
      this.Project_EditData = data;
      this.EditProject_Data.id = this.Project_EditData.id;
      this.EditProject_Data.projectName = this.Project_EditData.projectName;
      this.EditProject_Data.description = this.Project_EditData.description;
    });
  }

  EditProjectFormDataSubmit() {
    this.userService
      .EditProjec(
        this.EditProject_Data.id,
        this.EditProject_Data.projectName,
        this.EditProject_Data.description,
        this.AddDept.org
      )
      .subscribe(
        (data: any) => {
          this.toastr.success("Updated Sucessfully...", "Organization", {
            progressBar: true,
            timeOut: 1500,
          });
          this.closemodel();
          this.getProjectData();
          this.getDeptData();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error("Update", "Updated Error... ", {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
  }
}
