import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder } from '../interfaces/IOrder';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
    this.myApi = 'orders';
    this.myApi2 = 'order';
    }

    getOrders(): Observable<IOrder[]>{
      return this.http.get<IOrder[]>(
         `${this.myAppUrl}${this.myApi}`,
         this._tokenservice.interceptor()
      )
    }

    deleteOrder(id: number): Observable<void>{
      return this.http.delete<void>(
        `${this.myAppUrl}${this.myApi2}/${id}`,
        this._tokenservice.interceptor()
      )
    }

    addOrder(order: IOrder): Observable<void>{
      return this.http.post<void>(
        `${this.myAppUrl}${this.myApi2}`,order,
        this._tokenservice.interceptor()
      ).pipe(tap(() =>{
          this._refreshRequired.next()
      }))
    }

    updateOrder(id: number,order: IOrder):Observable<void>{
      return this.http.put<void>(
        `${this.myAppUrl}${this.myApi2}/${id}`,order,
        this._tokenservice.interceptor()
      ).pipe(tap(()=>{
        this._refreshRequired.next()
      }))
    }

    getOneOrder(id:number):Observable<IOrder>{
      return this.http.get<IOrder>(
        `${this.myAppUrl}${this.myApi2}/${id}`,
        this._tokenservice.interceptor()
      ).pipe(tap(() =>{
        this._refreshRequired.next()
      }))
    }

}
