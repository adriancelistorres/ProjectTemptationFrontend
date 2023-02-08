import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/interfaces/ICategorty';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  formCategory2:FormGroup;
  id:number;
  listCategory: ICategory[]=[];

  constructor(
    private _categoryService:CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder
    ){
      this.formCategory2=this.fb.group({
        name_cat:['',Validators.required],
        state:['1',Validators.required]
      });
      this.id=0;
      this._categoryService.RefreshRequired.subscribe((result) =>{
        this.getCategorys();
      });
    }

    getCategorys(){
      this._categoryService.getCategory().subscribe((data: ICategory[])=>{
        this.listCategory = data;
      });
    }

    getOneCategory(id:number){
      this._categoryService.getOneCategory(id).subscribe((data:ICategory)=>{
        this.formCategory2.setValue({
          name_cat:data.name_cat,
          state:data.state
        });
      });
      this.id=id;
    }

    updateCategory(){
      const category: ICategory = {
        name_cat: this.formCategory2.value.name_cat,
        state:this.formCategory2.value.state
      };
      category.idcat = this.id;
      this._categoryService.updateCategory(this.id,category).subscribe(()=>{
        this.toastr.success('La categoria se actualizo correctamente');
      })
    }






}




