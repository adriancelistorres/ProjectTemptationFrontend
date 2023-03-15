import { Component } from '@angular/core';
import { IIncome } from 'src/app/interfaces/IIncome';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {

    listIncome: IIncome[]= [];
    newItem:any


    constructor(
      private _incomeService: IncomeService
    ){  }


  ngOnInit() {
    this.miIncome()
  }

  miIncome(){
    this._incomeService.getIncome().subscribe(
      (option2: any[])=>{
        this.listIncome = option2;
        this.newItem= this.listIncome[this.listIncome.length-1]
        console.log("LOG1",this.listIncome[1])
        console.log("LOG2",this.listIncome[this.listIncome.length-1])
        this.newItem=this.newItem.idicome + 1
        console.log(" nuevo Id Icome Icome",this.newItem)
      },
      (error: any)=>{
        console.log(error);
      }
    )
  }

}
