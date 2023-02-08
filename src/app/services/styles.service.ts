import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable, pipe, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IStyles } from "../interfaces/IStyles";
import { TokenInterceptorService } from "../shared/token/token-interceptor.service";

@Injectable({
    providedIn: 'root',
})
export class StylesService{
    private _refreshrequired =  new Subject<void>();
    get RefreshRequired(){
        return this._refreshrequired;
    }

    public myAppUrl: string;
    private myApi: string;
    private myApi2: string

    constructor(
        private http: HttpClient,
        private cookiesService: CookieService,
        private _tokenService: TokenInterceptorService
    ){
        this.myAppUrl = environment.endpoint;
        this.myApi = "styles";
        this.myApi2 = "style";
    }

    getStyles(): Observable<IStyles[]>{
        return this.http.get<IStyles[]>(
            `${this.myAppUrl}${this.myApi}`,
            this._tokenService.interceptor()
        );
    }

    deleteStyle(id: number): Observable<void>{
        return this.http.delete<void>(
            `${this.myAppUrl}${this.myApi2}/${id}`,
            this._tokenService.interceptor()
        );
    }

    addStyle(style: IStyles):Observable<void>{
        return this.http.post<void>(
            `${this.myAppUrl}${this.myApi2}`,style,
            this._tokenService.interceptor()
        ).pipe(tap(() =>{
            this.RefreshRequired.next();
        }));
    }

    updateStyle(id:number, style: IStyles): Observable<void>{
        return this.http.put<void>(
            `${this.myAppUrl}${this.myApi2}/${id}`,style,
            this._tokenService.interceptor()
        ).pipe(tap(() =>{
            this._refreshrequired.next();
        }));
    }
    getOneStyle(id:Number):Observable<IStyles>{
        return this.http.get<IStyles>(
            `${this.myAppUrl}${this.myApi2}/${id}`,
            this._tokenService.interceptor()
        ).pipe(tap(() =>{
            this._refreshrequired.next();
        }))
    }
}