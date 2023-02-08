import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/interfaces/ICategorty';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  listCategory: ICategory [] =[];
  searchText:any;

  constructor(
    //PARAMETROS DEL METODO CONSTRUCTOR
    private _categoryService: CategoryService,
    private toastr:ToastrService,
    private _errorService: ErrorService)

    {
      this._categoryService.RefreshRequired.subscribe(result =>{
        this.getCategory()
      })
    }

    @ViewChild(EditCategoryComponent) addwiew!:EditCategoryComponent;

    ngOnInit():void{
      this.getCategory();
    }


    getCategory(){
      this._categoryService.getCategory().subscribe((data:ICategory[])=>{
        this.listCategory = data;
      })
    }

    edit(id:number){
      this.addwiew.getOneCategory(id);
      console.log(id);
    }

    deleteCategory(id:number){
      Swal.fire({
        title:'Seguro que desea eliminarlo?',
        text:'Se eliminara la categoria',
        icon:'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result)=>{
        if(result.isConfirmed){
          this._categoryService.deleteCategory(id).subscribe({next:()=>{
            this.getCategory();
            this.toastr.success('La categoria fue eliminado satisfactoriamente');
          },
          error: (e: HttpErrorResponse) => {
            this._errorService.msjError(e);
          }});
        }
      });
    }

}
