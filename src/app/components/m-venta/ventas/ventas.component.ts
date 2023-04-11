import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from 'src/app/interfaces/IOrder';
import { IProducts } from 'src/app/interfaces/IProduct';
import { ISaleDetail } from 'src/app/interfaces/ISaleDetail';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { SaleDetailService } from 'src/app/services/sale-detail.service';
import { ErrorService } from 'src/app/utils/error/error.service';
interface IOrderSale{
  idsale: number | any,
  idproduc: number | any,
  idorder: number | any,
  quantity: number | any,
  price_sale: number | any,
  name_p: string | any,

}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  listSaleDetail: ISaleDetail[] = []
  searchText: any;
  columnB: any = "idorder";
  total: number = 0;
  idorder?: any;
  idproduc?: any;
  productosList: any[] = [];
  SaleOrderList: any[] = [];

  constructor(
    private _orderService: OrderService,
    private _saleService: SaleDetailService,
    private _productService: ProductService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) {

   }

  ngOnInit(): void {
    this.getSaleOrder();
  }

  // getSaleDetail() {
  //   this._saleService.getSaleDetails().subscribe((data: ISaleDetail[]) => {
  //     this.listSaleDetail = data;
  //     console.log(this.listSaleDetail)
  //     this.total = this.listSaleDetail.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.price_sale * obj.quantity),
  //       0);
  //     this.idorder = this.listSaleDetail.map((obj) => obj.idorder);
  //     this.idproduc = this.listSaleDetail.map((obj) => obj.idproduc);
  //       console.log("IDORDER",this.idorder)
  //     console.log("Total: ", this.total)
  //     this.getProducto();
  //   })
  // }

  // getProducto(){
  //     this._productService.getProducts().subscribe(
  //       (option: any[]) =>{
  //         this.productosList = option.filter(option=> option.idproduc === this.idproduc);
  //         console.log("LOG1",this.productosList)
  //       },
  //       (error: any) => {
  //         console.log(error);
  //       }
  //     )
  // }

  getSaleOrder(){
    this._saleService.getSaleDetails().subscribe((SaleDetail: ISaleDetail[]) => {
      this._productService.getProducts().subscribe((Produc: IProducts[])=>{
        const saleOrderList: IOrderSale[] = [];

        SaleDetail.forEach(detail =>{
          const product = Produc.find(p => p.idproduc === detail.idproduc);

          if(product){
            saleOrderList.push({
              idsale: detail.idsale,
              idproduc: detail.idproduc,
              idorder: detail.idorder,
              quantity: detail.quantity,
              price_sale: detail.price_sale,
              name_p: product.name_p
            });
          }
        });
        this.total = this.SaleOrderList.reduce((
          acc,
          obj,
        ) => acc + (obj.price_sale * obj.quantity),
          0);

        console.log("Total: ", this.total)
      
        this.SaleOrderList = saleOrderList;
        console.log("SaleOrderList",saleOrderList)
      })
    })
  }


  

  getTotalById() {
    this._saleService.getSaleDetails().subscribe((data: ISaleDetail[]) => {
      // Filtrar los elementos que coincidan con el ID
      const filteredData = data.filter(d => d.idorder === this.idorder);
      console.log('Filtered data:', filteredData);
  
      // Sumar los elementos filtrados
      const total = filteredData.reduce((acc, obj) => acc + (obj.price_sale * obj.quantity), 0);
      console.log('Total:', total);
    });
  }
}
