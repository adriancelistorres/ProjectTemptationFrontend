import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/ICategorty';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //CREANDO ATRIBUTO PRIVADO '_refreshRequired'
  private _refreshRequired = new Subject<void>();

  //METODO 'RefreshRequired'
  get RefreshRequired() {
    return this._refreshRequired;
  }

  //CREANDO ATRIBUTOS DE LA CLASE 'CategoryService'
  public myAppUrl: string;
  public myApi: string;
  public myApi2: string;

  constructor(
    //PARAMETROS DEL METODO CONSTRUCTOR
    private http: HttpClient,
    private _tokenservice: TokenInterceptorService
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApi = 'categorys';
    this.myApi2 = 'category';
  }

  getCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      `${this.myAppUrl}${this.myApi}`,

      this._tokenservice.interceptor()
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.myAppUrl}${this.myApi2}/${id}`,

      this._tokenservice.interceptor()
    );
  }

  addCategory(category: ICategory): Observable<void> {
    return this.http
      .post<void>(
        `${this.myAppUrl}${this.myApi2}`,

        category,

        this._tokenservice.interceptor()
      )
      .pipe(
        tap(() => {
          this._refreshRequired.next();
        })
      );
  }

  updateCategory(id: number, category: ICategory): Observable<void> {
    return this.http
      .put<void>(
        `${this.myAppUrl}${this.myApi2}/${id}`,

        category,

        this._tokenservice.interceptor()
      )
      .pipe(
        tap(() => {
          this._refreshRequired.next();
        })
      );
  }

  getOneCategory(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(
      `${this.myAppUrl}${this.myApi2}/${id}`,

      this._tokenservice.interceptor()
    );
  }
}
