import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IDetailIncome } from 'src/app/interfaces/IDetailIncome';
import { DetailincomeService } from 'src/app/services/detailincome.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import { EditDetailincomeComponent } from '../edit-detailincome/edit-detailincome.component';

@Component({
  selector: 'app-detailincome',
  templateUrl: './detailincome.component.html',
  styleUrls: ['./detailincome.component.css']
})
export class DetailincomeComponent {
  listDetailIncome: IDetailIncome[] = [];
  searchText: any;
  ColumnB:any="idicome";
  total:number=0;
  idicome?:number


  @ViewChild(EditDetailincomeComponent) editview!: EditDetailincomeComponent;
  edit(id: number) {
    this.editview.getOneDetail(id);
    console.log(id)
  }

  constructor(
    private _detailincomeService: DetailincomeService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ){
    this._detailincomeService.RefreshRequired.subscribe(reult =>{
      this.getDetailIncome()
    })
  }
  ngOnInit():void{
    this.getDetailIncome();
    
  }

  llamarPipe(){

  }

  getDetailIncome(){
    this._detailincomeService.getDetailIncomes().subscribe((data: IDetailIncome[]) =>{
      this.listDetailIncome = data;
      console.log(this.listDetailIncome)
      
      this.total = this.listDetailIncome.reduce((
      acc,
      obj,
    ) => acc + (obj.price_buy * obj.quantity),
    0);
    console.log("Total: ", this.total)
    })
  }

  getTotalById() {
    this._detailincomeService.getDetailIncomes().subscribe((data: IDetailIncome[]) => {
      // Filtrar los elementos que coincidan con el ID
      const filteredData = data.filter(d => d.idicome === this.idicome);
      console.log('Filtered data:', filteredData);
  
      // Sumar los elementos filtrados
      const total = filteredData.reduce((acc, obj) => acc + (obj.price_buy * obj.quantity), 0);
      console.log('Total:', total);
    });
  }
}

