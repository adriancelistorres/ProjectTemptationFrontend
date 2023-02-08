import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IStyles } from 'src/app/interfaces/IStyles';
import { StylesService } from 'src/app/services/styles.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-add-styles',
  templateUrl: './add-styles.component.html',
  styleUrls: ['./add-styles.component.css']
})
export class AddStylesComponent {
  listStyle: IStyles[] = [];
  formStyle: FormGroup;

  constructor(
    private _styleservice: StylesService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ){
    this.formStyle =  this.fb.group({
      name_sty: ['', Validators.required],
      state: ['1', Validators.required],
    });
  }

  addStyle(){
    const style: IStyles ={
      name_sty: this.formStyle.get('name_sty')?.value,
      state: this.formStyle.get('state')?.value,
    }
    this._styleservice.addStyle(style).subscribe(()=>{
      this.toastr.success('El Estilo se agrego correctamente');
    });
  }
}
