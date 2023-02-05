import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private cookiesService: CookieService) {}

  interceptor() {
    const token = this.cookiesService.get('token');
    // const nn= document.cookie
    const obj = JSON.parse(token);
    const finalToken = obj['token'];

    // console.log(token);
    // console.log(obj);

    // console.log(finalToken);

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${finalToken}`,
      }),
    };
  }

}
