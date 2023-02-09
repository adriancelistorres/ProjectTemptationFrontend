import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ISize } from 'src/app/interfaces/ISize';
import { SizeService } from 'src/app/services/size.service';

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
    private fb: FormBuilder
  ){
    this.formSize = this.fb.group({
      name_size:['',Validators.required],
      state:['1',Validators.required]
    });
  }

  addSize(){
    const size: ISize = {
      name_size: this.formSize.get('name_size')?.value,
      state:this.formSize.get('state')?.value
    };

    this._sizeService.addSize(size).subscribe(()=>{
      this.toastr.success('El tamaño se agrego correctamente');
    })

  }












}
