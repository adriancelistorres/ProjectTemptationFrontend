import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRoles } from '../interfaces/IRoles';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private _refreshRequired=new Subject<void>();

  get RefreshRequired(){
    return this._refreshRequired;
  }

  public myAppUrl: string;
  private myApi: string;
  private myApi2: string;
  constructor( private http: HttpClient,
    private cookiesService: CookieService,
    private _tokenservice: TokenInterceptorService) { 
      this.myAppUrl = environment.endpoint;
    this.myApi = 'roles';
    this.myApi2 = 'role';
    }

    getRoles(): Observable<IRoles[]>{
      return this.http.get<IRoles[]>(
        `${this.myAppUrl}${this.myApi}`,
      this._tokenservice.interceptor()
      );
    }

    deleteRol(id:number):Observable<void>{
      return this.http.delete<void>(
       `${this.myAppUrl}${this.myApi2}/${id}` ,
      this._tokenservice.interceptor()
      )
    }

    addRol(rol:IRoles):Observable<void>{
      return this.http.post<void>(
        `${this.myAppUrl}${this.myApi2},rol`,
        this._tokenservice.interceptor()).pipe(tap(()=>{
          this._refreshRequired.next();
        }))
    }
    updateColor(id:number,rol:IRoles):Observable<void>{
      return this.http.put<void>(
        `${this.myAppUrl}${this.myApi2}/${id},rol`,
        this._tokenservice.interceptor()
      ).pipe(tap(()=>{
        this._refreshRequired.next();
      }));
    }

    getOneColor(id:number):Observable<IRoles>{
      return this.http.get<IRoles>(
        `${this.myAppUrl}${this.myApi2}/${id}`,
        this._tokenservice.interceptor()
      ).pipe(tap(()=>{
        this._refreshRequired.next();
      }));
    }
}