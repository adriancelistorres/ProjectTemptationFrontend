import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'node_modules/ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class GuardianGuard implements CanActivate {
  constructor(private cookiesService: CookieService, private router: Router) {}
  redirect(flag: boolean): any {
    if(!flag){
       this.router.navigate(['/', 'login']);
    }

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const cookie = this.cookiesService.check('token');
    this.redirect(cookie);

    return cookie;
  }
}
