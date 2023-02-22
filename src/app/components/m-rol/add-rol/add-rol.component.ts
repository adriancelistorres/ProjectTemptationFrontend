import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IRoles } from 'src/app/interfaces/IRoles';
import { RolService } from 'src/app/services/rol.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.css']
})
export class AddRolComponent {
  listRol: IRoles[] = [];
  formRol: FormGroup;

  constructor(
    private _rolservice: RolService,
    private toastr:ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService,
  )
  {
    this.formRol = this.fb.group({
      namerol: ['', Validators.required],
      // state: ['1', Validators.required],
    });
  }

  addRol(){
    const rol: IRoles = {
      namerol: this.formRol.get('namerol')?.value,
      state: 1
    };
    this._rolservice.addRol(rol).subscribe({next:()=>{
      // console.log(JSON.stringify());
      this.toastr.success('El rol se agrego correctamente');
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})
  }
}
