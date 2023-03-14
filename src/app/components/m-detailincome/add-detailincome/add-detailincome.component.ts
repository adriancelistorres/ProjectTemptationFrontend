import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDetailIncome } from 'src/app/interfaces/IDetailIncome';
import { IProducts } from 'src/app/interfaces/IProduct';
import { DetailincomeService } from 'src/app/services/detailincome.service';
import { ProductService } from 'src/app/services/product.service';
import { IncomeService } from 'src/app/services/income.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import { IIncome } from 'src/app/interfaces/IIncome';

@Component({
  selector: 'app-add-detailincome',
  templateUrl: './add-detailincome.component.html',
  styleUrls: ['./add-detailincome.component.css']
})
export class AddDetailincomeComponent {
    listDetailIncome: IDetailIncome[] = [];
    formDetail: FormGroup;
    listProduct: IProducts[] = [];
    selectedOption: [] = [];
    listIncome: IIncome[] = [];
    selectedOption2: [] = [];
    // listIncome2: IIncome[] = [];
    // id: number = 0;
    newItem:any

  

    constructor(
      private _detailincomeservice: DetailincomeService,
      private _producservice: ProductService,
      private _incomeservice: IncomeService,
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

    // obtenerElId(){
    //   this._incomeservice.getIncome().subscribe((data: IIncome[])=>{
    //     this.listIncome2 = data;
    //     const firstIncome = this.listIncome2.shift();
    //     this.id = firstIncome?.idicome || 0;
    //     console.log(this.id);
    //   })
    // }




    addDetailIncome(){
      const detailincome: IDetailIncome ={
        idicome:this.formDetail.get('idicome')?.value,
        idproduc: this.formDetail.get('idproduc')?.value,
        price_buy: this.formDetail.get('price_buy')?.value,
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

    ngOnInit(){
      this.miProduct()
      this.miIncome()
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
    miIncome(){
      this._incomeservice.getIncome().subscribe(
        (option2: any[])=>{
          this.listIncome = option2;
          this.newItem= this.listIncome[this.listIncome.length-1]
          console.log("lenght:",this.newItem)
          this.newItem=this.newItem.idicome+1
          console.log(" nuevo Id Icome",this.newItem)
          this.newItem={
            idicome: this.newItem,
            idprovider: "",
            dateinco: "",
            state: ""
          }
          console.log("nueva Lista Icome : ",this.newItem)
          this.listIncome.push(this.newItem)
          console.log("Insertado")
        },
        (error: any)=>{
          console.log(error);
        }
      )
    }

}
