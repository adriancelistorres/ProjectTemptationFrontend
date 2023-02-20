import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/interfaces/ICategorty';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  listCategory: ICategory[] = [];
  formCategory: FormGroup;

  constructor(
    private _categoryService: CategoryService,
    private toastr:ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formCategory = this.fb.group({
      name_cat:['',Validators.required],
      //state:['1',Validators.required]
    });
  }

  addCategory(){
    const category: ICategory = {
      name_cat: this.formCategory.get('name_cat')?.value,
      state: 1
    };

    this._categoryService.addCategory(category).subscribe({next:()=>{
      // console.log(JSON.stringify());
      this.toastr.success('La Categoria se agrego correctamente');
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})
    
  }

}
