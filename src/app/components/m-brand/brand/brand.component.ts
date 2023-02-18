 import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/interfaces/IBrand';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { EditBrandComponent } from '../edit-brand/edit-brand.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

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

  @ViewChild(EditBrandComponent)addview!: EditBrandComponent;

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


  deleteBrand(id:number){
    Swal.fire({
      title: 'Seguro que desea eliminarlo?',
      text: "Se eliminara el color",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) =>{
      if(result.isConfirmed){
        this._brandService.deleteBrand(id).subscribe({next:() =>{
          this.getBrands();
          this.toastr.success('La marca fue eliminada satisfactoriamente');
        },
        error: (e: HttpErrorResponse) =>{
          this._errorService.msjError(e);
        }
      })
      }
    })


  }
}
