import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'node_modules/ngx-cookie-service';
import { ToastrService } from 'node_modules/ngx-toastr';
import { ILoginUser } from 'src/app/interfaces/ILoginUser';
import { ErrorService } from 'src/app/utils/error/error.service';
import { LoginService } from 'src/app/services/login.service';


import jwt_decode from 'jwt-decode';
import { DatasharingService } from 'src/app/shared/sharedService/datasharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;
   rol:number|any;

  constructor(
    private toastr: ToastrService,
    private _loginService: LoginService,
    private router: Router,
    private _errorServie: ErrorService,
    private cookiesService: CookieService, // private localstorage:Storage
    private sharedService: DatasharingService
  ) {
    // this.cookiesService.delete('token');
    // this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.cookiesService.delete('token');
    this.router.navigate(['/login']);
    // this.login ();
  }

  login() {
    if (this.username == '' || this.password == '') {
      this.toastr.error('todos los campos son obligatorios', 'Error');
      return;
    }

    const user: ILoginUser = {
      username: this.username,
      password: this.password,
    };
    this.loading = true;


    setTimeout(() => {
      this._loginService.login(user).subscribe({
        next: (token) => {
          // this.loading = true;
          // this.localstorage.setItem('token',`${JSON.stringify(token)}`)
          this.cookiesService.set('token', JSON.stringify(token));
          const tok:any=token
          // console.log('uno',tok);
          const finalToken = tok['token'];
          // console.log('dos',finalToken);
          const decodedToken:any = jwt_decode(finalToken);
          // console.log('tres',decodedToken);
          const role = decodedToken.rol;
          // console.log('rol:', role);
          this.rol = role;
          localStorage.setItem('rollogin', this.rol);
          let rolAlmacenado = localStorage.getItem('rollogin');
          console.log('LOGlogin',rolAlmacenado);
          console.log('El rol guardado en la clase es:', rolAlmacenado); // mostramos el valor del rol en la consola

          this.router.navigate(['/menu']);
        },
        error: (e: HttpErrorResponse) => {
          this._errorServie.msjError(e);
          this.loading = false;
        },
      });



    }, 1000);

  }


  // disparador(){
  //   this.sharedService.disparador.emit({
  //     data:LoginComponent.rol,}
  //   )
  // }


  // msjError(e:HttpErrorResponse){
  //   if(e.error.msg){
  //     this.toastr.error(e.error.msg,'ERROR');
  //   }else{
  //     this.toastr.error('ocurrio un error','Error')
  //   }
  // }

}
