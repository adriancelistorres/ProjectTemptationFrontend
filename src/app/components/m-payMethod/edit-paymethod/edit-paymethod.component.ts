import { HttpErrorResponse } from '@angular/common/http';
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
  formPay2:FormGroup;
  id: number;
  listPayMethod2: IPaymentMethod[] =[];
  constructor(
    private _paymethodservice: PaymethodService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formPay2= this.fb.group({
      name_pay:['',Validators.required],
      state:['1', Validators.required]
    });
    this.id = 0;
    this._paymethodservice.RefreshRequered.subscribe((result) =>{
      this.getPayMethods();
    });
  } 


  getPayMethods(){
    this._paymethodservice.getpayMethod().subscribe((data:IPaymentMethod[]) =>{
      this.listPayMethod2 = data;
    })
  }

  getOnePayMethods(id:number){
    this._paymethodservice.getOnepayMethod(id).subscribe((data:IPaymentMethod)=>{
      this.formPay2.setValue({
        name_pay: data.name_pay,
        state:data.state
      })
    })
    this.id = id;
    console.log(this.id);
  }

  updatePayMethod(){
    const paymethod: IPaymentMethod={
      name_pay: this.formPay2.value.name_pay,
      state: 1,
      key: 1,
    };
    paymethod.idpay =  this.id;
    console.log(paymethod)
    this._paymethodservice.updatepayMethod(this.id, paymethod).subscribe({ next:()=>{
      console.log(paymethod)
        this.toastr.success("El Metodo de Pago se actualizo correctamente");
      }, error: (e: HttpErrorResponse) =>{
        this._errorService.msjError(e);
      }
    })
  }
}
