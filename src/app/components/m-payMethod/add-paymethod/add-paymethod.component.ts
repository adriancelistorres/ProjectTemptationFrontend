import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPaymentMethod } from 'src/app/interfaces/Ipaymethod';
import { PaymethodService } from 'src/app/services/paymethod.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-add-paymethod',
  templateUrl: './add-paymethod.component.html',
  styleUrls: ['./add-paymethod.component.css']
})
export class AddPaymethodComponent {
  listPayMethod: IPaymentMethod[] =[];
  formPayMethod: FormGroup;

  constructor(
    private _paymethodService: PaymethodService,
    private toastr: ToastrService,
    private  fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formPayMethod = this.fb.group({
      name_pay: ['', Validators.required]
    });
  }
  addPayMethods(){
    const paymethod: IPaymentMethod ={
      name_pay: this.formPayMethod.get("name_pay")?.value,
      state: 1,
      key: 1
    };
    this._paymethodService.addpayMethod(paymethod).subscribe({next: () =>{
      this.toastr.success("EL metodo de pago se agrego correctamente");
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})
  }

}
