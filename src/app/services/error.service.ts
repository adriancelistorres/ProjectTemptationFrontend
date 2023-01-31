import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'node_modules/ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }


  msjError(e:HttpErrorResponse){
    if(e.error.msg){
      this.toastr.error(e.error.msg,'ERROR');
    }else{
      this.toastr.error('ocurrio un error','Error')
    }
  }
}
