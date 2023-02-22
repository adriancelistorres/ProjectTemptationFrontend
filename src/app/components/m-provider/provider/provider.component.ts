import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProvider } from 'src/app/interfaces/IProvider';
import { ProviderService } from 'src/app/services/provider.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { DetailProviderComponent } from '../detail-provider/detail-provider.component';
import { EditProviderComponent } from '../edit-provider/edit-provider.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit{
  listProvider: IProvider[] =[];
  searchText: any;
  selecProvider: IProvider[] | any;
  listPersonOne: IProvider[] =[];

  constructor(
    private _providerService: ProviderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService,
  ){
    this._providerService.RefreshRequired.subscribe(result=>{
      this.getProviders();
    })
  }
  @ViewChild(DetailProviderComponent)detailview!: DetailProviderComponent;
  @ViewChild(EditProviderComponent)editview!: EditProviderComponent;

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders(){
    this._providerService.getProvider().subscribe((data:IProvider[]) =>{
      this.listProvider = data;
    })
  }

  edit(id: number){
    this.editview.getOneProvider(id);
    console.log(id);
  }

  GetProviderOne(id: number) {
    this.detailview.getOnePerson(id);
    console.log(id)
  }

  deleteProvider(id: number){
    Swal.fire({
      title: 'Seguro que desea eliminar',
      text: 'Se eliminara al Proveedor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) =>{
      if(result.isConfirmed){
        this._providerService.deleteProvider(id).subscribe({next:() =>{
          this.getProviders();
          this.toastr.success('El Proveedor fue eliminado Correctamente')
        },error: (e:HttpErrorResponse) =>{
          this._errorService.msjError(e)
        }})
      }
    })
  }

}
