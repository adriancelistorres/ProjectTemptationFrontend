import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISaleDetail } from '../interfaces/ISaleDetail';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class SaleDetailService {
    private _refreshRequired = new Subject<void>();

    get RefreshRequired(){
        return this._refreshRequired;
    }
    public myAppUrl: string;
    private myApi: string;
    private myApi2: string;
  constructor(
    private http: HttpClient,
    
    private _tokenservice: TokenInterceptorService
  ) { 
    this.myAppUrl = environment.endpoint;
    this.myApi = "saledetails";
    this.myApi2 = "saledetail";
  }

  getSaleDetails():Observable<ISaleDetail[]>{
    return this.http.get<ISaleDetail[]>(
      `${this.myAppUrl}${this.myApi}`,
      this._tokenservice.interceptor()
    )
  }

  deleteSaleDetail(id: number): Observable<void>{
    return this.http.delete<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`,
      this._tokenservice.interceptor()
    )
  }

  addSaleDetail(saleDetail: ISaleDetail): Observable<void>{
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApi2}`,saleDetail,
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
        this._refreshRequired.next();
    }))
  }

  updateSaleDetail(id: number, saleDetail: ISaleDetail):Observable<void>{
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`,saleDetail,
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
      this._refreshRequired.next();
    }))
  }

  getOnesaleDetail(id:number):Observable<ISaleDetail>{
    return this.http.get<ISaleDetail>(
      `${this.myAppUrl}${this.myApi2}/${id}`,
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
      this._refreshRequired.next()
    }))
  }
}
