import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ISize } from 'src/app/interfaces/ISize';
import { SizeService } from 'src/app/services/size.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-edit-size',
  templateUrl: './edit-size.component.html',
  styleUrls: ['./edit-size.component.css']
})
export class EditSizeComponent {
  formSize2: FormGroup;
  id:number;
  listSize: ISize[]=[];

  constructor(
    private _sizeService:SizeService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formSize2 = this.fb.group({
      name_size: ['',Validators.required],
      state:['',Validators.required]
    });
    this.id=0;
    this._sizeService.RefreshRequired.subscribe((result)=>{
      this.getSizes();
    });
  }

  getSizes(){
    this._sizeService.getSize().subscribe((data:ISize[])=>{
      this.listSize = data;
    });
  }

  getOneSize(id:number){
    this._sizeService.getOneSize(id).subscribe((data:ISize)=>{
      this.formSize2.setValue({
        name_size:data.name_size,
        state:data.state
      });
    });
    this.id=id;
  }

  updateSize(){
    const size: ISize = {
      name_size: this.formSize2.value.name_size,
      state: 1
    };
    size.idsize = this.id;
    this._sizeService.updateSize(this.id,size).subscribe({next:()=>{
      // console.log(JSON.stringify());
      this.toastr.success('El tamaño se Actualizo correctamente');
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})
  }


















}
