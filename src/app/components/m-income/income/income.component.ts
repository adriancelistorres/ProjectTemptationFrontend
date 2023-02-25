import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IIncome } from 'src/app/interfaces/IIncome';
import { IProvider } from 'src/app/interfaces/IProvider';
import { IncomeService } from 'src/app/services/income.service';
import { ProviderService } from 'src/app/services/provider.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import { AddDetailincomeComponent } from '../../m-detailincome/add-detailincome/add-detailincome.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
    listIncome: IIncome[]= [];
    formIncome: FormGroup;
    listProvider: IProvider []= [];
    selectedOption: [] = [];
    fechaActual: string = new Date().toLocaleDateString();
    mostrar : boolean = false;
  


  //   //Metodos para Obtener el IDprov
  // @ViewChild(AddDetailincomeComponent) addIdprov!: AddDetailincomeComponent;



  //   valorInput: string = "";
  //   @Output() enviarValorEvent = new EventEmitter<string>();

  //   enviarValor() {
  //     this.enviarValorEvent.emit(this.formIncome.value.idprovider);
  //     console.log(this.formIncome.value.idprovider);
  //   }

  //   addDetailIncome(id:number){
  //     id: parseInt(this.formIncome.value.idprovider)
  //     console.log(id)
  //     this.addIdprov.getOneColor(id)
  //     console.log(id)
  //   }
    
    // fechaActual: Date  = new Date()
    

    constructor(
      private _incomeService: IncomeService,
      private _providerService: ProviderService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private _errorService: ErrorService,
    ){
      this.formIncome = this.fb.group({
        idprovider:['',Validators.required],
        // dateinco:['',Validators.required],
        // state:['',Validators.required]
      })
    }

    // obtenerFechaYHora(): String {
    //   return this.datePipe.transform(this.fechaActual, 'dd/MM/yyyy HH:mm:ss');
    // }

    addIncome(){
      const income: IIncome = {
        idprovider: this.formIncome.get('idprovider')?.value,
        dateinco: this.fechaActual,
        state:1,
      };
      console.log(income);
      this._incomeService.addIncome(income).subscribe({next:()=>{
        this.toastr.success('La cabecera de compra fue registrada correctamente')
      },
      error: (e: HttpErrorResponse)=>{
        this._errorService.msjError(e);
      }
    })
    }

    ngOnInit() {
      this._providerService.getProvider().subscribe(
        (options: any[]) => {
          this.listProvider = options;
        },
        (error: any) => {
          console.log(error);
        },
      );
      this.mostrar = false;
    }

    mostrarComponente(){
      console.log("Funciones Cosas")
      if (this.mostrar != false) {
        `<p>Hola</p>`
        return this.mostrar = false;
      }else{
        console.log("Mostrar Cosas")
        return this.mostrar = true;
      } 
    }
}

