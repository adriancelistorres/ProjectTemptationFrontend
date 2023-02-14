import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/interfaces/IBrand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-edit-inactive-brand',
  templateUrl: './edit-inactive-brand.component.html',
  styleUrls: ['./edit-inactive-brand.component.css']
})
export class EditInactiveBrandComponent {
  formBrand2: FormGroup;
  id: number;
  listBrand: IBrand[] = [];
  // st:number=1;

  constructor(
    private _brandService: BrandService,
    private toastr: ToastrService,
    private fb: FormBuilder
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
      state: this.formBrand2.value.state,
    };
    brand.idbrand = this.id;
    console.log(brand);
    this._brandService.updateBrand(this.id, brand).subscribe(()=>{
      this.toastr.success('La marca se actualizo correctamente')
    });
  }
}
