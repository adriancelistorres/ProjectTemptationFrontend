import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/interfaces/ICategorty';
import { CategoryService } from 'src/app/services/category.service';

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
    private fb: FormBuilder
  ){
    this.formCategory = this.fb.group({
      name_cat:['',Validators.required],
      state:['1',Validators.required]
    });
  }

  addCategory(){
    const category: ICategory = {
      name_cat: this.formCategory.get('name_cat')?.value,
      state: this.formCategory.get('state')?.value,
    };

    this._categoryService.addCategory(category).subscribe(()=>{
      this.toastr.success('La categoria se agrego correctamente')
    })
  }

}
