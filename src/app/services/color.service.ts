import {
  HttpClient,
  HttpHeaders,
  HttpHeaderResponse,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IColor } from '../interfaces/IColor';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public myAppUrl: string;
  // private myApi: string;

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService,
    private _tokenservice: TokenInterceptorService
  ) {
    this.myAppUrl = environment.endpoint;
  }

  getColor(): Observable<IColor[]> {
    const token: any = this.cookiesService.get('token');
    // console.log(token)
    // console.log(this.getHttpHeaders())
    // let token= this.headers.append("Authorization", "Bearer"+ this.cookiesService.get('token'))
    return this.http.get<IColor[]>(
      `${this.myAppUrl}colors`,
      this._tokenservice.interceptor()
    );
  }

  // getHttpHeaders() {
  //   const token = this.cookiesService.get('token');
  //   // const nn= document.cookie
  //   const obj= JSON.parse(token)
  //   const finalToken=obj['token']
  //   console.log(token)
  //   console.log(obj)

  //   // console.log(Object.values(token));
  //   console.log(finalToken);
  //   // console.log(JSON.parse(token));
  //   // console.log({token:token})
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${finalToken}`
  //     })
  //   };
  // }

  // getcolor2(): Observable<any> {
  //   const token = this.cookiesService.get('token');

  //   const headers = new Headers({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   })
  //   return this.http.get(`${this.myAppUrl}colors`,  headers )
  // }
}
