import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/interfaces/ICategorty';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/utils/error/error.service';

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
    private fb: FormBuilder,
    private _errorService: ErrorService
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
        state:1
      };
      category.idcat = this.id;
      //para QUE SE EJECUTE UN 'Observable' PRIMERO TIENE QUE SUSCRIBIRSE.
      //YA QUE LUEGO ESTA función de suscriptor define cómo obtener o generar valores o mensajes para ser publicados.
      //EN ESTA LINEA NOS DICE:
      //*SUSCRIBETE AL METODO OBSERVABLE 'updateCategory' QUE SE ENCUENTRA EN '_categoryService' PARA ESTE OBJETO('this')
      this._categoryService.updateCategory(this.id, category).subscribe({next:()=>{
        //LUEGO DE QUE EL 'subscribe' EJECUTE EL METODO 'updateCategory' CORRECTAMENTE, MANDA UN TOASTR SUCCESS
        this.toastr.success('La Categoria se actualizo correctamente');
        } ,
        error: (e: HttpErrorResponse) =>{
        this._errorService.msjError(e);
      }})
    }
}




