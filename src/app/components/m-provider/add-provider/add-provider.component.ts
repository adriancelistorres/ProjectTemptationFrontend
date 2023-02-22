import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProvider } from 'src/app/interfaces/IProvider';
import { ProviderService } from 'src/app/services/provider.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from '@angular/router';



@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent {

  listProvider: IProvider[] =[];
  formProvider: FormGroup;
  selectedOption: [] =[];

  constructor(
    private _providerService: ProviderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formProvider = this.fb.group({
      name_prov: ['', Validators.required],
      ruc: ['', Validators.required],
      company_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      //state: ['', Validators.required],

    });
  }

  addProvider(){
    const provider: IProvider = {
      //idprovider: this.formProvider.get('idprovider')?.value,
      name_prov: this.formProvider.get('name_prov')?.value,
      ruc: this.formProvider.get('ruc')?.value,
      company_name: this.formProvider.get('company_name')?.value,
      phone: this.formProvider.get('phone')?.value,
      email: this.formProvider.get('email')?.value,
      description: this.formProvider.get('description')?.value,
      address: this.formProvider.get('address')?.value,
      state: 1
    };
    this._providerService.addProvider(provider).subscribe({next: () =>{
      this.toastr.success('El Proveedor fue registrado correctamente ')
    },
    error: (e: HttpErrorResponse)=>{
      this._errorService.msjError(e);
    }

    })
  }

}
