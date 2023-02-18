import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/interfaces/IBrand';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent {
  formBrand2: FormGroup;
  id: number;
  listBrand: IBrand[] = [];
  // st:number=1;

  constructor(
    private _brandService: BrandService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formBrand2 = this.fb.group({
      name_brand: ['', Validators.required],
      state: ['',Validators.required],
    });
    this.id = 0;
    this._brandService.RefreshRequired.subscribe((result) =>{
      this.getBrands();
    })
  };

  getBrands(){
    this._brandService.getBrands().subscribe((data: IBrand[]) =>{
      this.listBrand = data;
    });
  }

  getOneBrand(id: number){
    this._brandService.getOneBrand(id).subscribe((data: IBrand) =>{
      this.formBrand2.setValue({
        name_brand: data.name_brand,
        state: data.state,
      });
    });
    this.id = id;
  }

  updateBrand(){
    const brand: IBrand ={
      name_brand: this.formBrand2.value.name_brand,
      state: 1,
    };
    brand.idbrand = this.id;

    console.log(brand);
    this._brandService.updateBrand(this.id, brand).subscribe({next:()=>{
      // console.log(JSON.stringify());
      this.toastr.success('La marca se actualizo correctamente');
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})
  }


}
