import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ISize } from 'src/app/interfaces/ISize';
import { SizeService } from 'src/app/services/size.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { EditSizeComponent } from '../edit-size/edit-size.component';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent {
  listSize: ISize[] = [];
  searchText:any;

  constructor(
    private _sizeService: SizeService,
    private toastr:ToastrService,
    private _errorService: ErrorService
  ){
      this._sizeService.RefreshRequired.subscribe(result =>{
        this.getSize();
      })
  }

  @ViewChild(EditSizeComponent) addview!: EditSizeComponent;
  
  ngOnInit():void{
    this.getSize();
  }


  getSize(){
    this._sizeService.getSize().subscribe((data:ISize[])=>{
      this.listSize = data;
    })
  }

  edit(id:number){
    this.addview.getOneSize(id);
    console.log(id);
  }

  deleteSize(id:number){
    Swal.fire({
      title:'Seguro que desea eliminarlo?',
      text:'Se eliminará el tamaño',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result)=>{
      if(result.isConfirmed){
        this._sizeService.deleteSize(id).subscribe({
          next:()=>{
            this.getSize();
            this.toastr.success('El tamaño fue eliminado satisfactoriamente');
          },
          error: (e:HttpErrorResponse)=>{
            this._errorService.msjError(e);
          }});
      }
    });
  }

}
