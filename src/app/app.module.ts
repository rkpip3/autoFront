import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { UserService } from "./shared/user.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthGuard } from "./auth/auth.guard";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
// import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CreateNewUserComponent } from "./user/create-new-user/create-new-user.component";
import { ForgotPasswordComponent } from "./user/forgot-password/forgot-password.component";

import { ToastrModule } from "ngx-toastr";
import { VerifyEmailComponent } from "./user/verify-email/verify-email.component";
import { PrivacyPolicyComponent } from "./withoutauthpage/privacy-policy/privacy-policy.component";
import { ProfileComponent } from "./profile/profile/profile.component";
import { NavHeaderComponent } from "./dashboard/nav-header/nav-header.component";
import { OrganizationComponent } from "./dashboard/organization/organization.component";
import { DepartmentComponent } from "./dashboard/department/department.component";
import { FooterComponent } from "./dashboard/footer/footer.component";
import { SidebarComponent } from "./dashboard/sidebar/sidebar.component";
import { NavbarComponent } from "./dashboard/navbar/navbar.component";
import { EditOrgComponent } from "./dashboard/organization/edit-org/edit-org.component";
import {
  NgbPaginationModule,
  NgbAlertModule,
} from "@ng-bootstrap/ng-bootstrap";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { AddNewUserComponent } from './dashboard/add-new-user/add-new-user.component';
import { VarifySubdomainComponent } from './user/varify-subdomain/varify-subdomain.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { BusinessProcessComponent } from './dashboard/business-process/business-process.component';
import { DiagramComponent } from './dashboard/business-process/diagram/diagram.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    CreateNewUserComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PrivacyPolicyComponent,
    ProfileComponent,
    NavHeaderComponent,
    OrganizationComponent,
    DepartmentComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    EditOrgComponent,
    ProjectsComponent,
    AddNewUserComponent,
    VarifySubdomainComponent,
    BusinessProcessComponent,
    DiagramComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    UserService,
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
