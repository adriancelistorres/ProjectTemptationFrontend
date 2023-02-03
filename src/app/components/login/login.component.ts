import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'node_modules/ngx-cookie-service';
import { ToastrService } from 'node_modules/ngx-toastr';
import { ILoginUser } from 'src/app/interfaces/ILoginUser';
import { ErrorService } from 'src/app/utils/error/error.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _loginService: LoginService,
    private router: Router,
    private _errorServie: ErrorService,
    private cookiesService: CookieService
  ) // private localstorage:Storage

  {}

  ngOnInit(): void {}

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
          this.router.navigate(['/menu']);
          // console.log(token);
        },
        error: (e: HttpErrorResponse) => {
          this._errorServie.msjError(e);
          this.loading = false;
        },
      });
    }, 1000);
  }

  // msjError(e:HttpErrorResponse){
  //   if(e.error.msg){
  //     this.toastr.error(e.error.msg,'ERROR');
  //   }else{
  //     this.toastr.error('ocurrio un error','Error')
  //   }
  // }
}
