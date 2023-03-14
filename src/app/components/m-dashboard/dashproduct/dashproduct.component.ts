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
    this.getProductColors();
    this.renderChart(this.labeldata,this.realdata);
  }

  renderChart(labels: any, data: any) {
    this.ctx = document.getElementById('myChart');

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
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


  getProductColors() {
    this._productservice.getProducts().subscribe(products => {

      products.forEach(product => {
        this._colorservice.getOneColor(product.idcolor).subscribe(color => {
          const colorName = color.name_col;

          if (this.colorCounts[colorName]) {
            this.colorCounts[colorName]++;
          } else {
            this.colorCounts[colorName] = 1;
          }

          this.labeldata = Object.keys(this.colorCounts) as Array<keyof typeof this.colorCounts>;
          this.realdata = this.labeldata.map(label => this.colorCounts[label]);
          this.renderChart(this.labeldata,this.realdata)
        });
      });
    });
  }

}
