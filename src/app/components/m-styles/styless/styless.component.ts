import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IStyles } from 'src/app/interfaces/IStyles';
import { StylesService } from 'src/app/services/styles.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { EditStylesComponent } from '../edit-styles/edit-styles.component';


@Component({
  selector: 'app-styless',
  templateUrl: './styless.component.html',
  styleUrls: ['./styless.component.css']
})
export class StylessComponent implements OnInit {
  listStyle: IStyles[] = [];
  searchText: any;

  constructor(
    private _styleService: StylesService ,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService,
  ){
    this._styleService.RefreshRequired.subscribe(result=>{
      this.getStyles();
    })
  }
  @ViewChild(EditStylesComponent)addview !:EditStylesComponent;

  ngOnInit():void{
    this.getStyles();
  }

  getStyles(){
    this._styleService.getStyles().subscribe((data:IStyles[])=>{
      this.listStyle = data;
    });
  }

  edit(id:number){
    this.addview.getOneStyle(id);
    console.log(id)
  }

  deleteStyle(id:number){
    Swal.fire({
      title: 'Seguro que desea eliminar',
      text: 'Se eliminara el Estilo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) =>{
      if(result.isConfirmed){
        this._styleService.deleteStyle(id).subscribe({next:() =>{
          this.getStyles();
          this.toastr.success("El Estilo fue eliminado Correctamente");
        },
        error: (e:HttpErrorResponse)=>{
          this._errorService.msjError(e);
        }});
      }
    });
  }
}
