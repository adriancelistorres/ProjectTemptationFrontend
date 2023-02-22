import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IRoles } from 'src/app/interfaces/IRoles';
import { RolService } from 'src/app/services/rol.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { EditRolComponent } from '../edit-rol/edit-rol.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent {
  listRol: IRoles[] = [];
  searchText: any;

  constructor(
    private _rolService: RolService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorServie: ErrorService,
  ){
    this._rolService.RefreshRequired.subscribe(result=>{
      this.getRoles();
    })
  }

  @ViewChild(EditRolComponent) addview!: EditRolComponent;


  ngOnInit(): void{
    this.getRoles();
  }

  getRoles(){
    this._rolService.getRoles().subscribe((data: IRoles[]) =>{
      this.listRol = data;
    })
  }

  edit(id: number) {
    this.addview.getOneRol(id);
    console.log(id)
  }

  deleteRol(id:number){
    Swal.fire({
      title: 'Seguro que desea eliminarlo?',
      text: "Se eliminara el color",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',

    }).then((result)=>{
      if(result.isConfirmed){
        this._rolService.deleteRol(id).subscribe({next:()=>{
          this.getRoles();
          this.toastr.success('El rol fue eliminado satisfactoriamente');
        },error:(e: HttpErrorResponse)=>{
          this._errorServie.msjError(e);
        }});
      }
    });
  }
}
