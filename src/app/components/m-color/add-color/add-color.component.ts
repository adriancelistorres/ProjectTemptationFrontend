import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css'],
})
export class AddColorComponent {
  listColor: IColor[] = [];
  formColor: FormGroup;

  constructor(
    private _colorService: ColorService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private _errorService: ErrorService

  ) {
    this.formColor = this.fb.group({
      name_col: ['', Validators.required],
      // state: ['1', Validators.required],
    });

  }

  addColor() {
    const color: IColor = {
      name_col: this.formColor.get('name_col')?.value,
      state: 1,
    };
    this._colorService.addColor(color).subscribe(
      //Definimos un objeto, el cual tiene dos propiedades: next y error
      {
        //next es una propiedad, el cual tiene como valor a una funcion flecha anonima sin paramatros y dentro de esta funcion colocamos un toastr en caso se haya añadido un color satisfactoriamente.
        next:()=>{
      this.toastr.success('El color se agrego correctamente');
    },
    //De lo contrario, en la propiedad 'error' se mandará un mensaje erroneo si no se agregó correctamente el color
    error:(e:HttpErrorResponse)=>{
      this._errorService.msjError(e);
    }});


  }

}
