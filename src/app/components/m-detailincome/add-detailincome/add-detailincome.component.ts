import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDetailIncome } from 'src/app/interfaces/IDetailIncome';
import { DetailincomeService } from 'src/app/services/detailincome.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import { DetailincomeComponent } from '../detailincome/detailincome.component';

@Component({
  selector: 'app-add-detailincome',
  templateUrl: './add-detailincome.component.html',
  styleUrls: ['./add-detailincome.component.css']
})
export class AddDetailincomeComponent {
    listDetailIncome: IDetailIncome[] = [];
    formDetail: FormGroup;

    constructor(
      private _detailincomeservice: DetailincomeService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private _errorService: ErrorService
    ){
        this.formDetail = this.fb.group({
          idicome: ['', Validators.required],
          idproduc: ['', Validators.required],
          price_buy: ['', Validators.required],
          quantity: ['', Validators.required],
        });
    }

    addDetailIncome(){
      const detailincome: IDetailIncome ={
        idicome:this.formDetail.get('idicome')?.value,
        idproduc: this.formDetail.get('idproduc')?.value,
        price_buy: this.formDetail.get('price_boy')?.value,
        quantity: this.formDetail.get('quantity')?.value,
        igv: 0.18
      }
      this._detailincomeservice.addDetailIncome(detailincome).subscribe({next: ()=>{
        this.toastr.success('El Detail Income fue registrada correctamente ')
      },   error: (e: HttpErrorResponse)=>{
        this._errorService.msjError(e);
      }
    })
    }


}
