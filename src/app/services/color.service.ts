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
  private myApi: string;
  private myApi2: string;

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService,
    private _tokenservice: TokenInterceptorService
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApi = 'colors';
    this.myApi2 = 'color';
  }

  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>(
      `${this.myAppUrl}${this.myApi}`,
      this._tokenservice.interceptor()
    );
  }

  deleteColor(id: number):Observable<void> {
    return this.http.delete<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`,
      this._tokenservice.interceptor()
    );
  }


  addColor(color:IColor):Observable<void>{
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApi2}`,color,
      this._tokenservice.interceptor())
  }

  updateColor(id:number,color:IColor):Observable<void>{
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`,color,
      this._tokenservice.interceptor()
    );
  }

  getOneColor(id:number):Observable<IColor>{
    return this.http.get<IColor>(
      `${this.myAppUrl}${this.myApi2}/${id}`,
      this._tokenservice.interceptor()
    );
  }

}
