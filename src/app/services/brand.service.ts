import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IBrand } from "../interfaces/IBrand";
import { TokenInterceptorService } from "../shared/token/token-interceptor.service";
import { ColorService } from "./color.service";

@Injectable({
    providedIn: 'root'
})
export class BrandService{
    private _refreshRequired = new Subject<void>();

    get RefreshRequired(){
        return this._refreshRequired;
    }
    public myAppUrl: string;
    private myApi: string;
    private myApi2: string;

    constructor(
        private http: HttpClient,
        private cookiService: ColorService,
        private _tokenservice: TokenInterceptorService
    ){
        this.myAppUrl =  environment.endpoint;
        this.myApi =  "brands";
        this.myApi2 = "brand";
    }

    getBrands(): Observable<IBrand[]>{
        return this.http.get<IBrand[]>(
            `${this.myAppUrl}${this.myApi}`,
            this._tokenservice.interceptor()
        )
    }
    deleteBrand(id:number): Observable<void>{
        return this.http.delete<void>(
        `${this.myAppUrl}${this.myApi2}/${id}`,
        this._tokenservice.interceptor()
        );
    }

    addBrand(brand: IBrand):Observable<void>{
        return this.http.post<void>(
            `${this.myAppUrl}${this.myApi2}`,brand,
            this._tokenservice.interceptor()
        ).pipe(tap(()=>{
            this._refreshRequired.next();
        }))
    }

    updateBrand(id: number, brand: IBrand):Observable<void>{
        return this.http.put<void>(
            `${this.myAppUrl}${this.myApi2}/${id}`,brand,
            this._tokenservice.interceptor()
        ).pipe(tap(()=>{
            this._refreshRequired.next();
        }));
    }

    getOneBrand(id:number):Observable<IBrand>{
        return this.http.get<IBrand>(
            `${this.myAppUrl}${this.myApi2}/${id}`,
            this._tokenservice.interceptor()
        ).pipe(tap(() =>{
            this._refreshRequired.next();
        }))
    }

}
