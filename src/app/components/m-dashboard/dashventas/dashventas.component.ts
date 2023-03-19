import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { IDetailIncome } from 'src/app/interfaces/IDetailIncome';
import { IIncome } from 'src/app/interfaces/IIncome';
import { IProvider } from 'src/app/interfaces/IProvider';
import { DetailincomeService } from 'src/app/services/detailincome.service';
import { IncomeService } from 'src/app/services/income.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-dashventas',
  templateUrl: './dashventas.component.html',
  styleUrls: ['./dashventas.component.css']
})
export class DashventasComponent implements OnInit {
  ctx: any
  listProvider: IProvider[] = []
  listDetailIncome: IDetailIncome[] = []
  listIncome: IIncome[] = []
  labeldata: any[] =[] 
  realdata: any [] = []
  constructor(
  ){}
    ngOnInit(){
  }

  renderChart(labels: any, data: any) {
    this.ctx = document.getElementById('myChart');

    new Chart(this.ctx, {
      type: 'line',
      data : {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }

  getQuantityOrder(){

  }

}
