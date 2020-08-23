import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";

import { AuthGuard } from "./auth/auth.guard";

import { VerifydomainGuard } from "../app/verifydomain.guard";

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { CreateNewUserComponent } from './user/create-new-user/create-new-user.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { PrivacyPolicyComponent } from './withoutauthpage/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { OrganizationComponent } from './dashboard/organization/organization.component';
import { DepartmentComponent } from './dashboard/department/department.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { AddNewUserComponent } from './dashboard/add-new-user/add-new-user.component';
import { VarifySubdomainComponent } from './user/varify-subdomain/varify-subdomain.component';
import { BusinessProcessComponent } from './dashboard/business-process/business-process.component';

const routes: Routes = [
  { path: "verification_login",component: VarifySubdomainComponent},
  // { path: "login",component: SignInComponent},
  { path: "login",component: SignInComponent, canActivate: [VerifydomainGuard]},

  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "organization", component: OrganizationComponent,canActivate: [AuthGuard]  },
  { path: "department", component: DepartmentComponent ,canActivate: [AuthGuard]},
  { path: "projects", component: ProjectsComponent ,canActivate: [AuthGuard]},
  { path: "add_new_user", component: AddNewUserComponent , canActivate: [AuthGuard]},
  { path: "business_process", component: BusinessProcessComponent , canActivate: [AuthGuard]},

  { path: "forgot-password",component: ForgotPasswordComponent},
  { path: "create-new-one",component: CreateNewUserComponent},
  { path: "email-verify",component: VerifyEmailComponent},
  { path: "privacy_policy",component: PrivacyPolicyComponent},

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
