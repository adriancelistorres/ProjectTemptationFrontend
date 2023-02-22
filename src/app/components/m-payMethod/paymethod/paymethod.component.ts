import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPaymentMethod } from 'src/app/interfaces/Ipaymethod';
import { PaymethodService } from 'src/app/services/paymethod.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { EditPaymethodComponent } from '../edit-paymethod/edit-paymethod.component';

@Component({
  selector: 'app-paymethod',
  templateUrl: './paymethod.component.html',
  styleUrls: ['./paymethod.component.css']
})
export class PaymethodComponent {
  listPayMethod: IPaymentMethod[] = [];
  searchText: any;

  constructor(
      private _paymethodService: PaymethodService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private _errorService: ErrorService,
  ){
    this._paymethodService.RefreshRequered.subscribe(result =>{
      this.getPayMethods();
    })
  }



  ngOnInit():void{
    this.getPayMethods()
  }

  // edit(id:number){
  //   //this.editview.getOnePayMethod(id);
  //   console.log(id);
  // }

  getPayMethods(){
    this._paymethodService.getpayMethod().subscribe((data: IPaymentMethod[]) =>{
      this.listPayMethod = data;
    })
  }


  deletePayMethod(id:number){
    Swal.fire({
      title: 'Seguro que desea eliminarlo?',
      text: "Se eliminara el El Metodo de Pago",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) =>{
      if(result.isConfirmed){
        this._paymethodService.deletepayMethod(id).subscribe({next:() =>{
          this.getPayMethods();
          this.toastr.success('El Metodo de Pago fue eliminada satisfactoriamente');
        },
        error: (e: HttpErrorResponse) =>{
          this._errorService.msjError(e);
        }
      })
      }
    })
  }
}
