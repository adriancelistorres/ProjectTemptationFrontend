import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPerson } from '../interfaces/IPerson';
import { IClaims } from '../interfaces/IClaims';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  private _refershRequired = new Subject<void>();
  get RefreshRequired() {
    return this._refershRequired;
  }

  public myAppUrl: string;
  public myApi: string;
  public myApi2: string;

  constructor(
    private http: HttpClient,
    private _tokenservice: TokenInterceptorService
  ){
    this.myAppUrl = environment.endpoint;
    this.myApi = 'claims';
    this.myApi2 = 'claim';
  }

  getClaims(): Observable<IClaims[]> {
    return this.http.get<IClaims[]>(
      `${this.myAppUrl}${this.myApi}`, this._tokenservice.interceptor())
    ;
  }

  deleteClaim(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApi2}/${id}`, this._tokenservice.interceptor());
  }

  addClaim(person: IClaims): Observable<void> {
    return this.http
      .post<void>(`${this.myAppUrl}${this.myApi2}`, person, 
      this._tokenservice.interceptor())
      .pipe(
        tap(() => {
          this._refershRequired.next();
        })
      );
  }

  updateClaim(id: number, person: IClaims): Observable<void> {
    return this.http
      .put<void>(`${this.myAppUrl}${this.myApi2}/${id}`, person, 
      this._tokenservice.interceptor())
      .pipe(
        tap(() => {
          this._refershRequired.next();
        })
      );
  }

  getOneClaim(id: number): Observable<IClaims> {
    return this.http.get<IClaims>(`${this.myAppUrl}${this.myApi2}/${id}`, this._tokenservice.interceptor()).
    pipe(
      tap(() => {
        this._refershRequired.next();
      })
    );
  }
}
