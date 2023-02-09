import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ISize } from 'src/app/interfaces/ISize';
import { SizeService } from 'src/app/services/size.service';

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
    private fb: FormBuilder
  ){
    this.formSize2 = this.fb.group({
      name_size: ['',Validators.required],
      state:['1',Validators.required]
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
      state: this.formSize2.value.state
    };
    size.idsize = this.id;
    this._sizeService.updateSize(this.id,size).subscribe(()=>{
      this.toastr.success('El tamaño se actualizo correctamente');
    })
  }


















}
