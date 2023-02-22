import { Component } from '@angular/core';
import { IProvider } from 'src/app/interfaces/IProvider';
import { ProviderService } from 'src/app/services/provider.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-detail-provider',
  templateUrl: './detail-provider.component.html',
  styleUrls: ['./detail-provider.component.css']
})
export class DetailProviderComponent {
  id: number;
  listProvider2: IProvider[] =[];
  selectProvider: IProvider | any;

  constructor(
    private _providerService: ProviderService,
    private _erroService: ErrorService
  ){
    this.id = 0
  }

  getOnePerson(id: number){
    this._providerService.getOneProvider(id).subscribe((data: IProvider) =>{
      this.selectProvider = data;
      console.log(this.listProvider2)
    })
  }

}
