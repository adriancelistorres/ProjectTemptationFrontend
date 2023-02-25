import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IDetailIncome } from 'src/app/interfaces/IDetailIncome';
import { DetailincomeService } from 'src/app/services/detailincome.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-detailincome',
  templateUrl: './detailincome.component.html',
  styleUrls: ['./detailincome.component.css']
})
export class DetailincomeComponent {
  listDetailIncome: IDetailIncome[] = [];
  searchText: any;

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

  getDetailIncome(){
    this._detailincomeService.getDetailIncomes().subscribe((data: IDetailIncome[]) =>{
      this.listDetailIncome = data;
      console.log(this.listDetailIncome)
    })
  }
}
