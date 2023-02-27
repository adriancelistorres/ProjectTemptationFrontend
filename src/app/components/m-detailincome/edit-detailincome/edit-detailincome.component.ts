import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDetailIncome } from 'src/app/interfaces/IDetailIncome';
import { IIncome } from 'src/app/interfaces/IIncome';
import { IProducts } from 'src/app/interfaces/IProduct';
import { DetailincomeService } from 'src/app/services/detailincome.service';
import { ProductService } from 'src/app/services/product.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-edit-detailincome',
  templateUrl: './edit-detailincome.component.html',
  styleUrls: ['./edit-detailincome.component.css']
})
export class EditDetailincomeComponent {  
  formDetailIncome: FormGroup;
  id: number;
  listDetailIncome: IDetailIncome[] = [];
  listProduct: IProducts[] = [];
  selectedOption: [] = [];

  constructor(
    private _detailincomeService: DetailincomeService,
    private  _producservice: ProductService, 
    private toastr: ToastrService,
    private fb: FormBuilder,
    private errorService: ErrorService
  ){
    this.formDetailIncome =  this.fb.group({
      idicome: ['', Validators.required],
      idproduc: ['', Validators.required],
      price_buy: ['',Validators.required],
      quantity: ['', Validators.required],
    });
    this.id = 0
    this._detailincomeService.RefreshRequired.subscribe((result)=>{
      this.getDetail();
    })
    }

    getDetail(){
      this._detailincomeService.getDetailIncomes().subscribe((data: IDetailIncome[])=>{
        this.listDetailIncome = data;
      })
    }

    getOneDetail(id: number){
      this._detailincomeService.getDetailIncome(id).subscribe((data: IDetailIncome)=>{
        this.formDetailIncome.setValue({
          idicome: data.idicome,
          idproduc: data.idproduc,
          price_buy: data.price_buy,
          quantity: data.quantity
        });
      });
      this.id = id;
    }

    updateDetailIncome(){
      const detail: IDetailIncome ={
        idicome : this.formDetailIncome.value.idicome,
        idproduc: this.formDetailIncome.value.idproduc,
        price_buy: this.formDetailIncome.value.price_buy,
        quantity: this.formDetailIncome.value.quantity,
        igv: 0.18
      }
      detail.idincome = this.id;
      console.log(detail)
      this._detailincomeService.updateDetailIncome(this.id, detail).subscribe({next: () =>{
        this.toastr.success('El detalle de Compra se Actualizo Correctamente')
      },
      error: (e: HttpErrorResponse)=>{
        this.errorService.msjError(e)
      }
    })
    }

    ngOnInit(){
      this.miProduct()
    }
    miProduct(){
      this._producservice.getProducts().subscribe(
        (options: any[]) =>{
          this.listProduct = options;
        },
        (error: any)=>{
          console.log(error)
        }
        )
    }

}
