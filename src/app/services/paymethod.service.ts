import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPaymentMethod } from '../interfaces/Ipaymethod';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class PaymethodService {
  private _refreshRequired = new Subject<void>();

  get RefreshRequered(){
    return this._refreshRequired;
  }

  private myAppUrl: string;
  private myApi: string;
  private myApi2: string;
  constructor(
    private http: HttpClient,
    private _tokenservice: TokenInterceptorService
  ) { 
    this.myAppUrl = environment.endpoint;
    this.myApi = 'paymentmethods';
    this.myApi2 = 'paymentmethod'
  }

  getpayMethod(): Observable<IPaymentMethod[]>{
    return this.http.get<IPaymentMethod[]>(
      `${this.myAppUrl}${this.myApi}`,
      this._tokenservice.interceptor()
    )
  }
  deletepayMethod(id: number):Observable<void>{
    return this.http.delete<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`,
      this._tokenservice.interceptor()
    )
  }

  addpayMethod(paymethod: IPaymentMethod): Observable<void>{
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApi2}`,paymethod,
      this._tokenservice.interceptor()
    ).pipe(
      tap(()=>{
        this._refreshRequired.next();
      })
    )
  }

  updatepayMethod(id:number,paymethod: IPaymentMethod ): Observable<void>{
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`,
      paymethod, this._tokenservice.interceptor()
    ).pipe(
      tap(() =>{
        this._refreshRequired.next();
      })
    )
  }

  getOnepayMethod(id: number): Observable<IPaymentMethod>{
    return this.http.get<IPaymentMethod>(
      `${this.myAppUrl}${this.myApi2}/${id}`,
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
      this._refreshRequired.next();
    }));
  }



}
