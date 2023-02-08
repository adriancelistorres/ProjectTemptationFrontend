import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISize } from '../interfaces/ISize';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
    private _refreshRequired=new Subject<void>();

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
      this.myApi = 'sizes';
      this.myApi2 = 'size';
     }

     getSize(): Observable<ISize[]> {
    return this.http.get<ISize[]>(
      `${this.myAppUrl}${this.myApi}`,
      this._tokenservice.interceptor()
    );
  }

  deleteSize(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`,

      this._tokenservice.interceptor()
    );
  }

  addSize(size: ISize): Observable<void> {
    return this.http
      .post<void>(
        `${this.myAppUrl}${this.myApi2}`,

        size,

        this._tokenservice.interceptor()
      )
      .pipe(
        tap(() => {
          this._refreshRequired.next();
        })
      );
  }

  updateSize(id: number, size: ISize): Observable<void> {
    return this.http
      .put<void>(
        `${this.myAppUrl}${this.myApi2}/${id}`,

        size,

        this._tokenservice.interceptor()
      )
      .pipe(
        tap(() => {
          this._refreshRequired.next();
        })
      );
  }

  getOneSize(id: number): Observable<ISize> {
    return this.http.get<ISize>(
      `${this.myAppUrl}${this.myApi2}/${id}`,

      this._tokenservice.interceptor()
    );
  }










}
