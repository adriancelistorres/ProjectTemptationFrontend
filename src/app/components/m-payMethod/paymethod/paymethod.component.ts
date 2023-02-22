import { Component } from '@angular/core';
import { IPaymentMethod } from 'src/app/interfaces/Ipaymethod';

@Component({
  selector: 'app-paymethod',
  templateUrl: './paymethod.component.html',
  styleUrls: ['./paymethod.component.css']
})
export class PaymethodComponent {
  listPayMethod: IPaymentMethod[] = [];
  searchText: any;
}
