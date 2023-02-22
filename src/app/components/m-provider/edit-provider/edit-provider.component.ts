import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProvider } from 'src/app/interfaces/IProvider';
import { ProviderService } from 'src/app/services/provider.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent {
  formProvider2: FormGroup;
  id: number;
  ListProvider: IProvider[] = [];
  selectedOption: [] = [];

  constructor(
    private _providerService: ProviderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formProvider2 = this.fb.group({
      name_prov: ['', Validators.required],
      ruc: ['', Validators.required],
      company_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      //state: ['', Validators.required],
    });
    this.id = 0;
    this._providerService.RefreshRequired.subscribe((resukt) =>{
      this.getProviders();
    })
  }

  getProviders(){
    this._providerService.getProvider().subscribe((data: IProvider[])=>{
      this.ListProvider = data;
    })
  }

  getOneProvider(id:number){
    this._providerService.getOneProvider(id).subscribe((data: IProvider)=>{
      this.formProvider2.setValue({
        name_prov: data.name_prov,
        ruc: data.ruc,
        company_name: data.company_name,
        phone: data.phone,
        email: data.email,
        description: data.description,
        address: data.address,
      })
    });
    this.id =  id;
  }

  updateProvider(){
    const provider: IProvider ={
      idprovider: this.formProvider2.value.idprovider,
      name_prov: this.formProvider2.value.name_prov,
      ruc: this.formProvider2.value.ruc,
      company_name: this.formProvider2.value.company_name,
      phone: this.formProvider2.value.phone,
      email: this.formProvider2.value.email,
      description: this.formProvider2.value.description,
      address: this.formProvider2.value.address,
      state: 1,
    }
    provider.idprovider = this.id;
    console.log(provider)
    this._providerService.updateProvider(this.id, provider).subscribe({next:()=>{
      // console.log(JSON.stringify());
      this.toastr.success('El proveedor se actualizo correctamente');
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})
  }


}
