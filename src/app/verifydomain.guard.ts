import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VerifydomainGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const checkstatus = sessionStorage.getItem("sbdverify");

    if (checkstatus != null && checkstatus == "true") return true;

    // if (checkstatus != null && checkstatus != "true") {
    //   this.router.navigate(["/verification_login"]);
    //   return false;
    // }else{
    //   this.router.navigate(["/login"])
    //   return true;
    // }

    this.router.navigate(["/verification_login"]);
    return false;
  }
}
