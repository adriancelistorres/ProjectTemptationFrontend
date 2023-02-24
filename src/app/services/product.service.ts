import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';
import { environment } from 'src/environments/environment';
import { IProducts } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _refreshRequired = new Subject<void>();

    get RefreshRequired(){
        return this._refreshRequired;
    }
    public myAppUrl: string;
    private myApi: string;
    private myApi2: string;
    private myApi3: string;


  constructor( private http: HttpClient,
    private _tokenservice: TokenInterceptorService) {
    this.myAppUrl =  environment.endpoint;
    this.myApi =  "addproduct";
    this.myApi2 = "products";
    this.myApi3 = "product";

   }

   getProducts(): Observable<IProducts[]>{
    return this.http.get<IProducts[]>(
        `${this.myAppUrl}${this.myApi2}`,
        this._tokenservice.interceptor()
    )
}
deleteProducts(id:number): Observable<void>{
    return this.http.delete<void>(
    `${this.myAppUrl}${this.myApi3}/${id}`,
    this._tokenservice.interceptor()
    );
}

addProduct(product: IProducts):Observable<void>{
    return this.http.post<void>(
        `${this.myAppUrl}${this.myApi}`,product,
        this._tokenservice.interceptor()
    ).pipe(tap(()=>{
        this._refreshRequired.next();
    }))
}

updateProduct(id: number, product: IProducts):Observable<void>{
    return this.http.put<void>(
        `${this.myAppUrl}${this.myApi3}/${id}`,product,
        this._tokenservice.interceptor()
    ).pipe(tap(()=>{
        this._refreshRequired.next();
    }));
}

getOneProduct(id:number):Observable<IProducts>{
    return this.http.get<IProducts>(
        `${this.myAppUrl}${this.myApi3}/${id}`,
        this._tokenservice.interceptor()
    ).pipe(tap(() =>{
        this._refreshRequired.next();
    }))
}
}
