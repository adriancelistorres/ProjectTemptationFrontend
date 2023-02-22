import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IRoles } from 'src/app/interfaces/IRoles';
import { RolService } from 'src/app/services/rol.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent {

  formRol2: FormGroup;
  id: number;
  listRol: IRoles[] = [];

  constructor(
    private _rolService: RolService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formRol2 = this.fb.group({
      namerol: ['', Validators.required],
      state: ['', Validators.required],
    });
    this.id = 0;
    this._rolService.RefreshRequired.subscribe((result)=>{
      this.getRoles();
    })
  }

  getRoles(){
    this._rolService.getRoles().subscribe((data: IRoles[]) =>{
      this.listRol = data;
    })
  }

  getOneRol(id: number) {
    this._rolService.getOneRol(id).subscribe((data: IRoles) => {
      this.formRol2.setValue({
        namerol: data.namerol,
        state: data.state,
      });
    });
    this.id = id;
  }  

  
  updateRol() {
    const rol: IRoles = {
      namerol: this.formRol2.value.namerol,
      state: 1
    };

    rol.idrol = this.id;
    console.log(rol);
    this._rolService.updateRol(this.id, rol).subscribe({next:()=>{
      this.toastr.success('El rol se actualizo correctamente');
    }, error: (e:HttpErrorResponse)=>{
      this._errorService.msjError(e);
    }});
  }
}
