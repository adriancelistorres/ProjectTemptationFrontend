import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/interfaces/IBrand';
import { ICategory } from 'src/app/interfaces/ICategorty';
import { IColor } from 'src/app/interfaces/IColor';
import { IProducts } from 'src/app/interfaces/IProduct';
import { ISize } from 'src/app/interfaces/ISize';
import { IStyles } from 'src/app/interfaces/IStyles';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { SizeService } from 'src/app/services/size.service';
import { StylesService } from 'src/app/services/styles.service';
import { FileUpload } from 'src/app/shared/models/file-upload.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  id: number;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads?: any[];
  formProduct2: FormGroup;
  listCategory: ICategory[] = [];
  listSize: ISize[] = [];
  listStyle: IStyles[] = [];
  listBrand: IBrand[] = [];
  listColor: IColor[] = [];
  selectedOption: [] = [];
  selectedOption1: [] = [];
  selectedOption2: [] = [];
  selectedOption3: [] = [];
  selectedOption4: [] = [];
  listProducts: IProducts[] = [];



  constructor( private _productService: ProductService,
    private toastr: ToastrService,
    private uploadService: FileUploadService,
    private fb: FormBuilder,
    private _errorService: ErrorService,
    private _categoriService: CategoryService,
    private _sizeService: SizeService,
    private _styleService: StylesService,
    private _brandService: BrandService,
    private _colorService: ColorService){
      this.id = 0;

    this.formProduct2 = this.fb.group({
      idcat: ['', Validators.required],
      idsize: ['', Validators.required],
      idstyles: ['', Validators.required],
      idbrand: ['', Validators.required],
      idcolor: ['', Validators.required],
      name_p: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      image_front: ['', Validators.required],
      image_back: ['', Validators.required],
      image_using: ['', Validators.required],
    });
    this._productService.RefreshRequired.subscribe((result) => {
      this.getProducts();
    });
  }
ngOnInit() {
    this.miCategoria();
    this.miBrand();
    this.miColor();
    this.miStyle();
    this.miSize();
  }
  // ngOnDestroy(){
  //   this.miCategoria()
  //   this.miBrand()

  // }
  getProducts() {
    this._productService.getProducts().subscribe((data: IProducts[]) => {
      this.listProducts = data;
    });
  }



  miCategoria() {
    this._categoriService.getCategory().subscribe(
      (options: any[]) => {
        this.listCategory =  options.filter(option=>option.state == 1);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  miBrand() {
    this._brandService.getBrands().subscribe(
      (option2: any[]) => {
        this.listBrand =  option2.filter(option2=>option2.state == 1);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  miColor() {
    this._colorService.getColors().subscribe(
      (option3: any[]) => {
        this.listColor = option3.filter(option3=>option3.state == 1);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  miStyle() {
    this._styleService.getStyles().subscribe(
      (option4: any[]) => {
        this.listStyle = option4.filter(option4=>option4.state == 1);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  miSize() {
    this._sizeService.getSize().subscribe(
      (option5: any[]) => {
        this.listSize = option5.filter(option5=>option5.state == 1);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
            console.log('PERCENTAGE', this.percentage);
            if (this.percentage == 100) {
              console.log('ID_KEY_POLLO_1', this.uploadService.idFire);
              setTimeout(() => {
                console.log('ID_KEY_POLLO_2', this.uploadService.idFire);
                console.log('ID_KEY_POLLO_3_URL', this.uploadService.urlFire);

                this.updateProduct()
              }, 1500);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
  getOneProduct(id: number){
    this._productService.getOneProduct(id).subscribe((data: IProducts) =>{
      this.formProduct2.setValue({
        idcat:data.idcat,
        idsize:data.idsize,
        idstyles:data.idstyles,
        idbrand:data.idbrand,
        idcolor:data.idcolor,
        name_p:data.name_p,
        description:data.description,
        price:data.price,
        stock:data.stock,
        image_front:data.image_front,
        image_back:data.image_back,
        image_using:data.image_using,
        state:data.state
      });
    });
    this.id = id;
  }


  updateProduct() {
      const product: IProducts = {
        idcat: this.formProduct2.value.idcat,
        idsize: this.formProduct2.value.idsize,
        idstyles: this.formProduct2.value.idstyles,
        idbrand: this.formProduct2.value.idbrand,
        idcolor: this.formProduct2.value.idcolor,
        name_p: this.formProduct2.value.name_p,
        description: this.formProduct2.value.description,
        price: this.formProduct2.value.price,
        stock: this.formProduct2.value.stock,
        image_front: this.uploadService.idFire,
        image_back: this.uploadService.idFire,
        image_using: this.uploadService.urlFire,
        state: 1,
      }
      product.idproduc = this.id;
      console.log(product.idproduc)
      this._productService.updateProduct(this.id,product).subscribe({
        
        next: () => {
          console.log('SI SE AGREGO O NO', this.uploadService.urlFire);
          this.toastr.success('El Producto se actualizo correctamente');
        },
        error: (e: HttpErrorResponse ) => {
          this._errorService.msjError(e);
        },
      });

  }

  Activate(){
    const product: IProducts = {
      // idcat: this.formProduct2.value.idcat,
      // idsize: this.formProduct2.value.idsize,
      // idstyles: this.formProduct2.value.idstyles,
      // idbrand: this.formProduct2.value.idbrand,
      // idcolor: this.formProduct2.value.idcolor,
      // name_p: this.formProduct2.value.name_p,
      // description: this.formProduct2.value.description,
      // price: this.formProduct2.value.price,
      // stock: this.formProduct2.value.stock,
      // // image_front: this.uploadService.idFire,
      // // image_back: this.uploadService.idFire,
      // // image_using: this.uploadService.urlFire,
      state: 1,
    }
    product.idproduc = this.id;
    console.log(product.idproduc)
    this._productService.updateProduct(this.id,product).subscribe({
      
      next: () => {
        console.log('SI SE AGREGO O NO', this.uploadService.urlFire);
        this.toastr.success('El Producto se actualizo correctamente');
      },
      error: (e: HttpErrorResponse ) => {
        this._errorService.msjError(e);
      },
    });
    this.getProducts();

  }

}
