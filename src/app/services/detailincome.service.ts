import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDetailIncome } from '../interfaces/IDetailIncome';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class DetailincomeService {

  private _refreshRequired = new Subject<void>();
  
  get RefreshRequired(){
    return this._refreshRequired;
  }
  public myAppUrl: string;
  private myApi: string;
  private myApi2: string
  constructor(
    private http: HttpClient,
    private cookiesService: CookieService,
    private _tokenservice: TokenInterceptorService
  ) { 
    this.myAppUrl = environment.endpoint;
    this.myApi = "detailincomes";
    this.myApi2 = "detailincome"
  }

  getDetailIncomes(): Observable<IDetailIncome[]>{
    return this.http.get<IDetailIncome[]>(
      `${this.myAppUrl}${this.myApi}`,
      this._tokenservice.interceptor()
    )
  }

  addDetailIncome(detailincome: IDetailIncome): Observable<void>{
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApi2}`, detailincome,
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
      this._refreshRequired.next();
    }))
  }

  updateDetailIncome(id:number, detailincome: IDetailIncome):Observable<void>{
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`, detailincome,
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
      this._refreshRequired.next();
    }))
  }

  getDetailIncome(id:number): Observable<IDetailIncome>{
    return this.http.get<IDetailIncome>(
      `${this.myAppUrl}${this.myApi2}/${id}`,
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
      this._refreshRequired.next();
    }))
  }


}
