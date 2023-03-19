import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { subscribeOn } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { IDetailIncome } from 'src/app/interfaces/IDetailIncome';
import { IIncome } from 'src/app/interfaces/IIncome';
import { IProvider } from 'src/app/interfaces/IProvider';
import { DetailincomeService } from 'src/app/services/detailincome.service';
import { IncomeService } from 'src/app/services/income.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-dashcompras',
  templateUrl: './dashcompras.component.html',
  styleUrls: ['./dashcompras.component.css']
})
export class DashcomprasComponent implements OnInit {
  listProvider: IProvider[] = []
  listDetailIncome: IDetailIncome[] = []
  listIncome: IIncome[] = []
  ctx : any
  labeldata: any[] =[] 
  realdata: any [] = []
  constructor(
    private _detailIncomeService: DetailincomeService,
    private _proveedorService:ProviderService,
    private _incomeService: IncomeService
  ){}
    ngOnInit(){
    this.getProviderStock()
  }

  renderChart(labels: any, data: any) {
    this.ctx = document.getElementById('myChart');
    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: "Cantidad de Productos Comprados al Proveedor",
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ],
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  getProviderStock() {
    this._proveedorService.getProvider().subscribe((data: IProvider[]) => {
      this._incomeService.getIncome().subscribe((dataI: IIncome[]) => {
        this._detailIncomeService.getDetailIncomes().subscribe((dataD: IDetailIncome[]) => {
          // Crear un objeto que servirá para hacer una búsqueda eficiente por ID de proveedor
          const providersById = data.reduce((acc:any, provider) => {
            acc[provider.idprovider] = provider;
            return acc;
          }, {});
  
          // Crear un objeto que contendrá la cantidad asociada del detail_income por proveedor
          const detailIncomeByProvider = dataD.reduce((acc: any, detailIncome) => {
            const income = dataI.find((income) => income.idicome === detailIncome.idicome);
            if (income) {
              const providerId = income.idprovider;
              if (!acc[providerId]) {
                acc[providerId] = 0;
              }
              acc[providerId] += detailIncome.quantity;
            }
            return acc;
          }, {});
  
          // Crear un arreglo que contendrá los nombres de los proveedores y la cantidad asociada del detail_income por proveedor
          const labeldataArray = [];
          const realdata = [];
          for (const idProvider in detailIncomeByProvider) {
            if (detailIncomeByProvider.hasOwnProperty(idProvider)) {
              const quantity = detailIncomeByProvider[idProvider];
              const provider = providersById[idProvider];
              if (provider) {
                labeldataArray.push(provider.company_name);
                realdata.push(quantity);
              }
            }
          }
  
          // Renderizar el gráfico con los datos obtenidos
          this.renderChart(labeldataArray, realdata);
        });
      });
    });
  }
  


}
