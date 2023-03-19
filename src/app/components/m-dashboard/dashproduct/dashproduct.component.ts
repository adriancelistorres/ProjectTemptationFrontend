import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { forkJoin, map } from 'rxjs';
import { ICategory } from 'src/app/interfaces/ICategorty';
import { IColor } from 'src/app/interfaces/IColor';
import { IProducts } from 'src/app/interfaces/IProduct';
import { ISize } from 'src/app/interfaces/ISize';
import { IStyles } from 'src/app/interfaces/IStyles';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { SizeService } from 'src/app/services/size.service';
import { StylesService } from 'src/app/services/styles.service';
Chart.register(...registerables)


@Component({
  selector: 'app-dashproduct',
  templateUrl: './dashproduct.component.html',
  styleUrls: ['./dashproduct.component.css']
})
export class DashproductComponent implements OnInit {
  ctx: any;
  constructor(
    private _productservice: ProductService,
    private _colorservice: ColorService,
    private _categoriaservice: CategoryService,
    private _styleservice:StylesService,
    private __sizeservice: SizeService
  ) {}

  chatdata: any
  labeldata: any[] =[] 
  realdata: any [] = []
  colordata: any [] = []

  //Pruebas
  listColor: any [] = []
  listcategory: any [] = []
  listsize: any [] = []
  liststyle: any [] = []

  listProduct: any[] = []


  ngOnInit():void{
    this.getProduct()
    this.getProductColor()
    this.getProductCategoria()
    this.getProductSize()
    this.getProductstyle()

  }

  /*Grafico General*/
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
/*Grafico Cantidad de Productos por Color*/
  renderChart2(labels: any, data: any) {
    this.ctx = document.getElementById('myChart2');

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Productos',
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
  /*Grafico Cantidad de Productos por Categoria*/
  renderChart3(labels: any, data: any) {
    this.ctx = document.getElementById('myChart3');

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Productos',
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

/*Grafico Cantidad de Productos por Tamaño*/
  renderChart4(labels: any, data: any) {
    this.ctx = document.getElementById('myChart4');
    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Productos',
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
  /*Grafico Cantidad de Productos por Estilo*/
  renderChart5(labels: any, data: any) {
    this.ctx = document.getElementById('myChart5');

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Productos',
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
  getProduct(){
    this._productservice.getProducts().subscribe((data: IProducts[])=>{
      this.realdata = data.map(product => product.stock);
      this.labeldata = data.map(product =>product.name_p);
      console.log("realdata",this.realdata);
      console.log("LabelDAta",this.realdata);
      this.renderChart(this.labeldata,this.realdata);
    })
  }

  getProductColor(){
    this._productservice.getProducts().subscribe((data: IProducts[])=>{
      this._colorservice.getColors().subscribe((dataC: IColor[]) =>{
        this.listProduct = data;
        this.listColor = dataC;
        let labeldataArray = [];
        let ProductCount = []
        for (let i = 0; i < this.listColor.length; i++) {
          let count = 0
          for (let a = 0; a < this.listProduct.length; a++) {
            if(this.listColor[i].idcolor == this.listProduct[a].idcolor){
              console.log("Color ID",this.listColor[i].idcolor)
              count++;
            }
          }
          if(count >0){
            ProductCount.push(count);
            labeldataArray.push(this.listColor[i].name_col)
            console.log("PRoduct Count",ProductCount)
          }

        }
        console.log("COLOR-Product RealData",ProductCount)
        console.log("COLOR-Product LableDATA",labeldataArray)
        this.renderChart2(labeldataArray,ProductCount); 
      })
    })
  }

  getProductCategoria(){
    this._productservice.getProducts().subscribe((data: IProducts[])=>{
      this._categoriaservice.getCategory().subscribe((dataCa: ICategory[]) =>{
        this.listProduct = data;
        this.listcategory = dataCa;
        let labeldataArray = [];
        let ProductCount = []
        for (let i = 0; i < this.listcategory.length; i++) {
          let count = 0
          for (let a = 0; a < this.listProduct.length; a++) {
            if(this.listcategory[i].idcat == this.listProduct[a].idcat){
              console.log("CAtegory ID",this.listcategory[i].idcat)
              count++;
            }
          }   
          if(count >0){
          console.log("Contador Categoria",count)
          labeldataArray.push(this.listcategory[i].name_cat)         
          ProductCount.push(count);
          console.log("PRoduct Count",ProductCount)
          }
        }
        console.log("Category-Product RealData",ProductCount)
        console.log("Category-Product LableDATA",labeldataArray)
        this.renderChart3(labeldataArray,ProductCount); 
      })
    })
  }

  getProductSize(){
    this._productservice.getProducts().subscribe((data: IProducts[])=>{
      this.__sizeservice.getSize().subscribe((dataSi: ISize[]) =>{
        this.listProduct = data;
        this.listsize = dataSi;
        let labeldataArray = [];
        let ProductCount = []
        for (let i = 0; i < this.listsize.length; i++) {
          let count = 0
          for (let a = 0; a < this.listProduct.length; a++) {
            if(this.listsize[i].idsize == this.listProduct[a].idsize){
              console.log("SIZE ID",this.listsize[i].idsize)
              count++;
            }
          }   
          if (count >0) {
            console.log("Contador SIZE",count)
            labeldataArray.push(this.listsize[i].name_size)         
            ProductCount.push(count);
            console.log("PRoduct Count",ProductCount)            
          }

          
        }
        console.log("Category-Product RealData",ProductCount)
        console.log("Category-Product LableDATA",labeldataArray)
        this.renderChart4(labeldataArray,ProductCount); 
      })
    })
  }

  getProductstyle(){
    this._productservice.getProducts().subscribe((data: IProducts[])=>{
      this._styleservice.getStyles().subscribe((dataSt: IStyles[]) =>{
        this.listProduct = data;
        this.liststyle = dataSt;
        let labeldataArray = [];
        let ProductCount = []
        for (let i = 0; i < this.liststyle.length; i++) {
          let count = 0
          for (let a = 0; a < this.listProduct.length; a++) {
            if(this.liststyle[i].idstyles == this.listProduct[a].idstyles){
              console.log("SIZE ID",this.liststyle[i].idsize)
              count++;
            }
          }   
          if (count >0) {
            console.log("Contador SIZE",count)
            labeldataArray.push(this.liststyle[i].name_sty)         
            ProductCount.push(count);
            console.log("PRoduct Count",ProductCount)            
          }       
        }
        console.log("Category-Product RealData",ProductCount)
        console.log("Category-Product LableDATA",labeldataArray)
        this.renderChart5(labeldataArray,ProductCount); 
      })
    })
  }


}
