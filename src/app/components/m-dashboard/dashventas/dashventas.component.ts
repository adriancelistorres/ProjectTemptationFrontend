import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { IDetailIncome } from 'src/app/interfaces/IDetailIncome';
import { IIncome } from 'src/app/interfaces/IIncome';
import { IOrder } from 'src/app/interfaces/IOrder';
import { IProducts } from 'src/app/interfaces/IProduct';
import { ISaleDetail } from 'src/app/interfaces/ISaleDetail';
import { DetailincomeService } from 'src/app/services/detailincome.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { SaleDetailService } from 'src/app/services/sale-detail.service';


@Component({
  selector: 'app-dashventas',
  templateUrl: './dashventas.component.html',
  styleUrls: ['./dashventas.component.css']
})
export class DashventasComponent implements OnInit {
  ctx: any
  listOrder: IOrder[] = []
  listSAleDetail: ISaleDetail[] = []
  listProduct: IProducts[] = []
  labeldata: any[] =[] 
  realdata: any [] = []
  constructor(
    private _saledateil: SaleDetailService,
    private _order: OrderService,
    private _ProductService: ProductService
  ){}
    ngOnInit(){
      this.getDetailProduct()
  }

  renderChart(labels: any, data: any) {
    this.ctx = document.getElementById('myChart');

    new Chart(this.ctx, {
      type: 'line',
      data : {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Productos Vendidos',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }

  getDetailProduct(){
    this._ProductService.getProducts().subscribe((dataP: IProducts[])=>{
      this._saledateil.getSaleDetails().subscribe((dataS: ISaleDetail[])=>{
        this.listProduct = dataP;
        this.listSAleDetail = dataS;
        let labeldataArray = [];
        let realdata = []
        for (let i = 0; i < this.listProduct.length; i++) {
          let count = 0
          for (let a = 0; a < this.listSAleDetail.length; a++) {
            if(this.listProduct[i].idproduc  == this.listSAleDetail[a].idproduc ){
              console.log("IDPORUDCT",this.listSAleDetail[a].idproduc)
              count++;
            }
          }
          if(count>0){
            labeldataArray.push(this.listProduct[i].name_p)
            realdata.push(this.listSAleDetail.filter(detail => detail.idproduc === this.listProduct[i].idproduc).reduce((acc, detail) => acc + detail.quantity, 0))
          }
          
        }
        console.log("DETAIL-Product RealData",realdata)
        console.log("DETAIL-Product LableDATA",labeldataArray)
        this.renderChart(labeldataArray,realdata); 
      })
    })

  }

}
