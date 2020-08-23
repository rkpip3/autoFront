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
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (next.routeConfig.path != "create-new-one") {
      localStorage.removeItem("superUserAccess_token");
    }

    if (localStorage.getItem("userToken") != null) return true;

    this.router.navigate(["/verification_login"]);
    return false;
  }
}
