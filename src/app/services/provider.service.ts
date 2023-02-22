import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IProvider } from "../interfaces/IProvider";
import { TokenInterceptorService } from "../shared/token/token-interceptor.service";


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private _refreshRequired=  new Subject<void>();

    get RefreshRequired(){
        return this._refreshRequired;
    }
    public myAppUrl: string;
    public myAddApi: string;
    public myApi: string;
    public myApi2: string;

  constructor( private http: HttpClient,
    private _tokenservice: TokenInterceptorService){
    this.myAppUrl =  environment.endpoint;
    this.myAddApi = 'addprovider';
    this.myApi = 'providers';
    this.myApi2 = "provider";
  }

  getProvider(): Observable<IProvider[]>{
    return this.http.get<IProvider[]>(
        `${this.myAppUrl}${this.myApi}`,
        this._tokenservice.interceptor()
    );
}

  deleteProvider(id: number): Observable<void>{
      return this.http.delete<void>(
          `${this.myAppUrl}${this.myApi2}/${id}`,
          this._tokenservice.interceptor()
      );
  }

  addProvider(person: IProvider): Observable<void>{
      return this.http.post<void>(
          `${this.myAppUrl}${this.myAddApi}`,person,
          this._tokenservice.interceptor()
      ).pipe(tap(() =>{
          this._refreshRequired.next();
      }))
  }

  updateProvider(id: number, person: IProvider): Observable<void>{
      return this.http.put<void>(
          `${this.myAppUrl}${this.myApi2}/${id}`,person,
          this._tokenservice.interceptor()
      ).pipe(tap(() =>{
          this._refreshRequired.next();
      }))
  }

  getOneProvider(id: number): Observable<IProvider>{
      return this.http.get<IProvider>(
          `${this.myAppUrl}${this.myApi2}/${id}`,
          this._tokenservice.interceptor()).pipe(tap(() =>{
            this._refreshRequired.next();
        }));
  }

}
