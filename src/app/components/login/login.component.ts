import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'node_modules/ngx-toastr';
import { ILoginUser } from 'src/app/interfaces/ILoginUser';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading:boolean=false

  constructor(
    private toastr: ToastrService,
    private _loginService: LoginService,
    private router:Router,
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.username == '' || this.password == '') {
      this.toastr.error('todos los campos son obligatorios', 'Error');
      return
    }

    const user: ILoginUser = {
      username: this.username,
      password: this.password,
    };
    this.loading=true;

    this._loginService.login(user).subscribe({
      next: (token) => {
        if(token==='contraseña incorrecta'|| token==='usuario no encontrado'){
          this.loading=false;
          this.toastr.error(token,'ERROR');
          console.log(token)

        }else{
          this.loading=true;
          localStorage.setItem('token',token)
          this.router.navigate(['/menu'])
          console.log(token)
        }
      },
      error:(e:HttpErrorResponse)=>{
        this.msjError(e)
      }
    });

  }


  msjError(e:HttpErrorResponse){
    if(e.error.msg){
      this.toastr.error(e.error.msg,'ERROR');
    }else{
      this.toastr.error('ocurrio un error','Error')
    }
  }
}
