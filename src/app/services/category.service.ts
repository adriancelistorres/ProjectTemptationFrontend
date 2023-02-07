import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/ICategorty';
import { TokenInterceptorService } from '../shared/token/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //CREANDO ATRIBUTO PRIVADO '_refreshRequired'
  private _refreshRequired = new Subject<void>();

  //METODO 'RefreshRequired'
  get RefreshRequired(){
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
    //DEFINIENDO LOS ATRIBUTOS DE LA CLASE 'CategoryService'
    //'environment' ES UN OBJETO EN EL CUAL ALMACENA UNA PROPIEDAD 'endpoint' QUE TIENE COMO VALOR NUESTRA RUTA LOCAL: 'http://localhost:3000/'
    this.myAppUrl = environment.endpoint;
    this.myApi = 'categorys';
    this.myApi2 = 'category';
   }

   //*Un 'Observable' es una colección de múltiples valores de entrada que se procesan usando métodos de array como map, reduce, filter, etc. Es muy útil cuando se manejan operaciones asíncronas tales como hacer peticiones HTTP, eventos de entrada de usuario, y así sucesivamente.

   //'getCategory' ES UN METODO DE TIPO 'Observable', EL CUAL ESTE Observable VA A TENER COMO PARAMETRO A UN TIPO INTERFAZ 'ICategory' Y ADEMAS ESTE('ICategory') SERÁ UNA ARRAY VACIO.
   getCategory():Observable<ICategory[]>{
    //RETORNA UNA PETICION GET DE TIPO 'ICategory' QUE ES UN ARRAY VACIO(AL INICIO YA Q LUEGO SE LLENARA CON LOS DATOS)
      return this.http.get<ICategory[]>(
        //Y COMO PRIMER ARGUMENTOS LE PASAMOS LA RUTA QUE TIENE ESTE SERVICIO GET:
        //${this.myAppUrl}         /${this.myApi}
        //'http://localhost:3000  /   categorys'
        `${this.myAppUrl}${this.myApi}`,
        //COMO SEGUNDO ARGUMENTO LE PASAMOS EL 'TOKEN' ,por seguridad, PARA QUE SOLO CIERTOS USUARIOS IDENTIFICADOS PUEDAN ACCEDER AL METODO GET.
        this._tokenservice.interceptor()
      );
   }

   //'deleteCategory' ES UN METODO DE TIPO 'Observable', EL CUAL ESTE Observable VA A SER 'VOID' 
   //'deleteCategory' TIENE COMO PARAMATERO UN 'id' DE TIPO NUMBER
   deleteCategory(id:number):Observable<void>{
    //RETORNA UNA PETICION DELETE 'void'
    return this.http.delete<void>(
       //Y COMO PRIMER ARGUMENTOS LE PASAMOS LA RUTA QUE TIENE ESTE SERVICIO DELETE:
        //${this.myAppUrl}         /${this.myApi}/${id}
        //'http://localhost:3000  /   category /   2'
      `${this.myAppUrl}${this.myApi2}/${id}`,
      //COMO SEGUNDO ARGUMENTO LE PASAMOS EL 'TOKEN' ,por seguridad, PARA QUE SOLO CIERTOS USUARIOS IDENTIFICADOS PUEDAN ACCEDER AL METODO DELETE.
      this._tokenservice.interceptor()
      );
   }

   //'addCategory' ES UN METODO DE TIPO 'Observable', EL CUAL ESTE Observable VA A SER 'VOID' 
   //'addCategory' TIENE COMO PARAMATERO UN 'category' DE TIPO INTERFAZ 'ICategory'
   addCategory(category:ICategory):Observable<void>{
    //RETORNA UNA PETICION POST 'void'
    return this.http.post<void>(
      //Y COMO PRIMER ARGUMENTOS LE PASAMOS LA RUTA QUE TIENE ESTE SERVICIO POST:
        //${this.myAppUrl}         /${this.myApi2}
        //'http://localhost:3000  /   category'
      `${this.myAppUrl}${this.myApi2}`,
      //COMO SEGUNDO PARAMETRO, LE PASAMOS EL CUERPO DE LA PETICIÓN, QUE EN ESTE CASO ES 'category' DE TIPO INTERFAZ 'ICategory'
      category,
      //COMO TERCER ARGUMENTO LE PASAMOS EL 'TOKEN' ,por seguridad, PARA QUE SOLO CIERTOS USUARIOS IDENTIFICADOS PUEDAN ACCEDER AL METODO POST.
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
      this._refreshRequired.next();
    }))
   }

   //'updateCategory' ES UN METODO DE TIPO 'Observable', EL CUAL ESTE Observable VA A SER 'VOID' 
   //'updateCategory' TIENE COMO PARAMETRO un 'id' DE TIPO NUMBER.TAMBIEN, TIENE COMO SEGUNDO PARAMATERO UN 'category' DE TIPO INTERFAZ 'ICategory'
   updateCategory(id:number,category:ICategory):Observable<void>{
    //RETORNA UNA PETICION PUT 'void'
    return this.http.put<void>(
      //Y COMO PRIMER ARGUMENTOS LE PASAMOS LA RUTA QUE TIENE ESTE SERVICIO PUT:
        //${this.myAppUrl}         /${this.myApi}/${id}
        //'http://localhost:3000  /   category /   2'
      `${this.myAppUrl}${this.myApi2}/${id}`,
      //COMO SEGUNDO PARAMETRO, LE PASAMOS EL CUERPO DE LA PETICIÓN, QUE EN ESTE CASO ES 'category' DE TIPO INTERFAZ 'ICategory'
      category,
      //COMO TERCER ARGUMENTO LE PASAMOS EL 'TOKEN' ,por seguridad, PARA QUE SOLO CIERTOS USUARIOS IDENTIFICADOS PUEDAN ACCEDER AL METODO PUT.
      this._tokenservice.interceptor()
    ).pipe(tap(()=>{
      this._refreshRequired.next();
    }))
   }

   //'getOneCategory' ES UN METODO DE TIPO 'Observable', EL CUAL ESTE Observable VA A SER 'VOID' 
   //'getOneCategory' TIENE COMO PARAMATERO UN 'id' DE TIPO NUMBER
   getOneCategory(id:number):Observable<ICategory>{
    //RETORNA UNA PETICION GET DE TIPO INTERFAZ'ICategory' 
    return this.http.get<ICategory>(
        //Y COMO PRIMER ARGUMENTOS LE PASAMOS LA RUTA QUE TIENE ESTE SERVICIO POST:
        //${this.myAppUrl}         /${this.myApi2}/ ${id}
        //'http://localhost:3000  /   category/        2'
      `${this.myAppUrl}${this.myApi2}/${id}`,
      //COMO TERCER ARGUMENTO LE PASAMOS EL 'TOKEN' ,por seguridad, PARA QUE SOLO CIERTOS USUARIOS IDENTIFICADOS PUEDAN ACCEDER AL METODO GET.
      this._tokenservice.interceptor()
    );
   }









}
