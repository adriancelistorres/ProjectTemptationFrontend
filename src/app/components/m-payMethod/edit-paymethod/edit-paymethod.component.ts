import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPaymentMethod } from 'src/app/interfaces/Ipaymethod';
import { PaymethodService } from 'src/app/services/paymethod.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-edit-paymethod',
  templateUrl: './edit-paymethod.component.html',
  styleUrls: ['./edit-paymethod.component.css']
})
export class EditPaymethodComponent {
  formPay2:FormGroupName
  id: number;
  listPayMethod: IPaymentMethod[] =[];
  constructor(
    private _paymethodservice: PaymethodService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formPay2 =  this.fb
  } 
}
