import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ISize } from 'src/app/interfaces/ISize';
import { SizeService } from 'src/app/services/size.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.css']
})
export class AddSizeComponent {
  listSize: ISize[]= [];
  formSize:FormGroup;

  constructor(
    private _sizeService: SizeService,
    private toastr:ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formSize = this.fb.group({
      name_size:['',Validators.required],
      //state:['1',Validators.required]
    });
  }

  addSize(){
    const size: ISize = {
      name_size: this.formSize.get('name_size')?.value,
      state:1
    };

    this._sizeService.addSize(size).subscribe({next:()=>{
      // console.log(JSON.stringify());
      this.toastr.success('El tamaño se agrego correctamente');
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})

  }












}
