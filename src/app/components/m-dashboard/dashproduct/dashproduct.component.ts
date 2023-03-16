import { Component } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { forkJoin, map } from 'rxjs';
import { IProducts } from 'src/app/interfaces/IProduct';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
Chart.register(...registerables)


@Component({
  selector: 'app-dashproduct',
  templateUrl: './dashproduct.component.html',
  styleUrls: ['./dashproduct.component.css']
})
export class DashproductComponent {
  ctx: any;
  constructor(
    private _productservice: ProductService,
    private _colorservice: ColorService
  ) {}

  chatdata: any

  labeldata: any[] =[] 
  realdata: any [] = []
  colordata: any [] = []

  //Pruebas
  colorCounts: any [] = []


  ngOnInit():void{
    this.getProduct()
  }

  renderChart(labels: any, data: any) {
    this.ctx = document.getElementById('myChart');

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Productos',
          data: data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
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
  getProduct(){
    this._productservice.getProducts().subscribe((data: IProducts[])=>{
      this.realdata = data.map(product => product.stock);
      this.labeldata = data.map(product =>product.name_p);
      console.log("realdata",this.realdata);
      console.log("LabelDAta",this.realdata);
      this.renderChart(this.labeldata,this.realdata);
    })
  }

}
