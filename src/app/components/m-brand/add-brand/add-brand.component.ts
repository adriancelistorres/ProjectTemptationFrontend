import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/interfaces/IBrand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent {
  listBrand: IBrand[] =[];
  formBrand: FormGroup;

  constructor(
    private _brandService: BrandService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
  ){
    this.formBrand =  this.fb.group({
      name_brand: ['', Validators.required],
      state: ['1',Validators.required],
    });
  }
  addBrand(){
    const brand: IBrand = {
      name_brand: this.formBrand.get('name_brand')?.value,
      state: this.formBrand.get('state')?.value,
    };
    this._brandService.addBrand(brand).subscribe(()=>{
      this.toastr.success('La marca se agrego correctamente');
    })
  }

}
