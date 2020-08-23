import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./user.model";

@Injectable()
export class UserService {
  readonly rootUrl = "http://localhost:8088";
  readonly MasterServerURL = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) {}

  subdomainVerify(verify_sub_domains) {
    const body = {
      SubDomainValue: verify_sub_domains,
    };

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(
      this.MasterServerURL + "/api/verify_subdomain",
      body,
      {
        headers: reqHeader,
      }
    );
  }

  registerUser(
    email,
    username,
    firstname,
    lastname,
    phonenumber,
    companyname,
    noofemp,
    autointelliSubdomain,
    password
  ) {
    const body = {
      email: email,
      userName: username,
      FirstName: firstname,
      LastName: lastname,
      PhoneNumber: phonenumber,
      CompnayName: companyname,
      NoOfEmp: noofemp,
      subDomain: autointelliSubdomain + ".autointelli.com",
      Password: password,
    };

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.MasterServerURL + "/api/create-user", body, {
      headers: reqHeader,
    });
  }

  resend_verification_email_API(email) {
    var data = { email: email };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(
      this.MasterServerURL + "/api/resend_verification_email",
      data,
      { headers: reqHeader }
    );
  }

  forgot_password_API(email) {
    var data = { email: email };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.MasterServerURL + "/api/forgot_password", data, {
      headers: reqHeader,
    });
  }

  userAuthentication(userName, password) {
    var data = {
      username: userName,
      password: password,
      isFirstTimeLogin: "",
      rm: sessionStorage.getItem("rm"),
      rm_status: sessionStorage.getItem("rm_status"),
      cid_client: sessionStorage.getItem("cid_client"),
      cid_id: sessionStorage.getItem("cid_id"),
      cid_retffff: sessionStorage.getItem("cid_retffff"),
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.MasterServerURL + "/api/lg", data, {
      headers: reqHeader,
    });
  }

  sendingProfile(project_name, project_dept) {
    var data = {
      project_name: project_name,
      project_dept: project_dept,
      userNotFirstTimeLogin: true,
      email: localStorage.getItem("GetUserEmail"),
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.MasterServerURL + "/api/profile", data, {
      headers: reqHeader,
    });
  }

  // userAuthentication(userName, password) {
  //   var data =
  //     "client_id=autointelliClientID&username=" +
  //     userName +
  //     "&password=" +
  //     password +
  //     "&grant_type=password&client_secret=541ac339-cf0e-44b1-b6bc-685ab037cf6c";
  //   var reqHeader = new HttpHeaders({
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   });
  //   return this.http.post(this.rootUrl+"/auth/realms/autointelli/protocol/openid-connect/token",
  //     data,
  //     { headers: reqHeader }
  //   );
  // }

  // http://localhost:8000/create/org/

  AddOrg(OrganizationID, OrganizationName, Description) {
    var data = {
      OrganizationID: OrganizationID,
      OrganizationName: OrganizationName,
      Description: Description,
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.MasterServerURL + "/create/org/", data, {
      headers: reqHeader,
    });
  }

  // http://localhost:8000/create/org/

  UpdateOrg(id, OrganizationID, OrganizationName, Description) {
    var data = {
      id: id,
      OrganizationID: OrganizationID,
      OrganizationName: OrganizationName,
      Description: Description,
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.put(
      this.MasterServerURL + "/create/org/" + id + "/",
      data,
      {
        headers: reqHeader,
      }
    );
  }

  getOrg() {
    var paramsval =
      "?rm=" +
      sessionStorage.getItem("rm") +
      "&cid_client=" +
      sessionStorage.getItem("cid_client") +
      "&cid_retffff=" +
      sessionStorage.getItem("cid_retffff") +
      "&cid_id=" +
      sessionStorage.getItem("cid_id");
    return this.http.get(
      this.MasterServerURL + "/create/orgview/" + paramsval,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("userToken"),
        }),
      }
    );
  }

  editOrg(id) {
    return this.http.get(this.MasterServerURL + "/create/org/" + id + "/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  getDelete(id) {
    return this.http.delete(this.MasterServerURL + "/create/org/" + id + "/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }


  AddDept(org_seleted, DeptID, DeptName, Description, Organization, org) {
    var data = {
      org_seleted: "",
      DeptID: DeptID,
      DeptName: DeptName,
      Description: Description,
      Organization: Organization,
      org: org,
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.MasterServerURL + "/create/dept/", data, {
      headers: reqHeader,
    });
  }


  getDept() {
    return this.http.get(this.MasterServerURL + "/create/dept/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  // ADD PROJECT START
  getpProject() {
    return this.http.get(this.MasterServerURL + "/create/project/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  AddProjectS(projectName, description, department) {
    var data = {
      projectName: projectName,
      description: description,
      department: department,
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.MasterServerURL + "/create/project/", data, {
      headers: reqHeader,
    });
  }

  EditProjec(id, projectName, description, department) {
    var data = {
      id: id,
      projectName: projectName,
      description: description,
      department: department,
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.put(
      this.MasterServerURL + "/create/project/" + id + "/",
      data,
      {
        headers: reqHeader,
      }
    );
  }

  ProjectDetailsView(id) {
    return this.http.get(this.MasterServerURL + "/create/project/" + id + "/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  DeleteProjects(id) {
    return this.http.delete(
      this.MasterServerURL + "/create/project/" + id + "/",
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  // ADD PROJECT END

  EditDepart(id) {
    return this.http.get(this.MasterServerURL + "/create/dept/" + id + "/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  DeleteDepartment(id) {
    return this.http.delete(this.MasterServerURL + "/create/dept/" + id + "/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  UpdateDepart(
    id,
    DeptID,
    DeptNameDeptID,
    DescriptionDeptID,
    OrganizationDeptID,
    org
  ) {
    var data = {
      id: id,
      org_seleted: org,
      DeptID: DeptID,
      DeptName: DeptNameDeptID,
      Description: DescriptionDeptID,
      Organization: OrganizationDeptID,
      org: org,
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.put(
      this.MasterServerURL + "/create/dept/" + id + "/",
      data,
      {
        headers: reqHeader,
      }
    );
  }

  getUserClaims() {
    return this.http.get(
      this.rootUrl +
        "/auth/realms/" +
        sessionStorage.getItem("rm") +
        "/protocol/openid-connect/userinfo"
    );
  }

  // REGISTER SUB USER START
  RegistereSubUSer(firstName, lastName, email, username, mobile) {
    var data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      mobile: mobile,
      Password: "password",
      CompnayName: "",
      NoOfEmp: "",
      subDomain: "",
    };
    var paramsval =
      "?rm=" +
      sessionStorage.getItem("rm") +
      "&cid_client=" +
      sessionStorage.getItem("cid_client") +
      "&cid_retffff=" +
      sessionStorage.getItem("cid_retffff") +
      "&cid_id=" +
      sessionStorage.getItem("cid_id");

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(
      this.MasterServerURL + "/api/create_sub_user" + paramsval,
      data,
      {
        headers: reqHeader,
      }
    );
  }
  // REGISTER SUB USER END

  CurrentUsersList() {
    var paramsval =
      "?rm=" +
      sessionStorage.getItem("rm") +
      "&cid_client=" +
      sessionStorage.getItem("cid_client") +
      "&cid_retffff=" +
      sessionStorage.getItem("cid_retffff") +
      "&cid_id=" +
      sessionStorage.getItem("cid_id");
    return this.http.get(this.MasterServerURL + "/api/lstofusr" + paramsval);
  }

  // REGISTER SUB USER START
  DeleteUser(id) {
    var data = { id: id };
    var paramsval =
      "?rm=" +
      sessionStorage.getItem("rm") +
      "&cid_client=" +
      sessionStorage.getItem("cid_client") +
      "&cid_retffff=" +
      sessionStorage.getItem("cid_retffff") +
      "&cid_id=" +
      sessionStorage.getItem("cid_id");

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.MasterServerURL + "/api/del" + paramsval, data, {
      headers: reqHeader,
    });
  }

  DisabledUserService(id) {
    var data = { id: id };
    var paramsval =
      "?rm=" +
      sessionStorage.getItem("rm") +
      "&cid_client=" +
      sessionStorage.getItem("cid_client") +
      "&cid_retffff=" +
      sessionStorage.getItem("cid_retffff") +
      "&cid_id=" +
      sessionStorage.getItem("cid_id");

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(
      this.MasterServerURL + "/api/dis_usr" + paramsval,
      data,
      { headers: reqHeader }
    );
  }

  EnableUserService(id) {
    var data = { id: id };
    var paramsval =
      "?rm=" +
      sessionStorage.getItem("rm") +
      "&cid_client=" +
      sessionStorage.getItem("cid_client") +
      "&cid_retffff=" +
      sessionStorage.getItem("cid_retffff") +
      "&cid_id=" +
      sessionStorage.getItem("cid_id");

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(
      this.MasterServerURL + "/api/enb_usr" + paramsval,
      data,
      { headers: reqHeader }
    );
  }
}
//End
