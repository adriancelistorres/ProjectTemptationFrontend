import { Component, ViewChild } from '@angular/core';
 import { HttpErrorResponse } from '@angular/common/http';

import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/interfaces/IBrand';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { EditBrandComponent } from '../edit-brand/edit-brand.component';
import { EditInactiveBrandComponent } from '../edit-inactive-brand/edit-inactive-brand.component';

@Component({
  selector: 'app-inactive-brand',
  templateUrl: './inactive-brand.component.html',
  styleUrls: ['./inactive-brand.component.css']
})
export class InactiveBrandComponent {

  listBrand: IBrand[] = [];
  searchText: any;

  constructor(
    private _brandService: BrandService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService,
  ){
    this._brandService.RefreshRequired.subscribe(result =>{
      this.getBrands();
    })
  }

  @ViewChild(EditInactiveBrandComponent)addview!: EditInactiveBrandComponent;

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this._brandService.getBrands().subscribe((data: IBrand[]) =>{
      this.listBrand = data;
    })
  }

  edit(id: number) {
    this.addview.getOneBrand(id);
    console.log(id)
  }



}
