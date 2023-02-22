import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
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
  formPay2:FormGroup
  id: number;
  listPayMethod: IPaymentMethod[] =[];
  constructor(
    private _paymethodservice: PaymethodService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formPay2 =  this.fb.group({
      name_pay: ['',Validators.required],
      state: ['1', Validators.required]
    });
    this.id = 0;
    this._paymethodservice.RefreshRequered.subscribe((result) =>{
      this.getPayMethods();
    });
  } 


  getPayMethods(){
    this._paymethodservice.getpayMethod().subscribe((data: IPaymentMethod[]) =>{
      this.listPayMethod = data;
    })
  }

  getOnePayMethods(id:number){
    this._paymethodservice.getOnepayMethod(id).subscribe((data: IPaymentMethod)=>{
      this.formPay2.setValue({
        name_pay: data.name_pay,
        state:data.state,
        key: data.key,
      })
    })
  }
}
