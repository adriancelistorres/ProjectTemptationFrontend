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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  searchText: any;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads?: any[];
  formProduct: FormGroup;
  listCategory: ICategory[] = [];
  listSize: ISize[] = [];
  listStyle: IStyles[] = [];
  listBrand: IBrand[] = [];
  listColor: IColor[] = [];
  selectedOption: [] = [];
  selectedOption1: [] = [];
  selectedOption2: [] =[];
  selectedOption3: [] =[];
  selectedOption4: [] =[];




  constructor(
    private _productService: ProductService,
    private toastr: ToastrService,
    private uploadService: FileUploadService,
    private fb: FormBuilder,
    private _errorService: ErrorService,
    private _categoriService: CategoryService,
    private _sizeService: SizeService,
    private _styleService: StylesService,
    private _brandService: BrandService,
    private _colorService: ColorService,

  ) {
    this.formProduct = this.fb.group({
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
  }

  ngOnInit() {
    this.miCategoria()
    this.miBrand()
    this.miColor()
    this.miStyle()
    this.miSize()
  }
  // ngOnDestroy(){
  //   this.miCategoria()
  //   this.miBrand()

  // }

  miCategoria(){
    this._categoriService.getCategory().subscribe(
      (options: any[]) => {
        this.listCategory = options;
      
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  miBrand(){
    this._brandService.getBrands().subscribe(
      (option2: any[]) =>{
        this.listBrand = option2
      },
      (error: any) =>{
        console.log(error);
      }
    )
  }

  miColor(){
    this._colorService.getColors().subscribe(
      (option3: any[]) =>{
        this.listColor = option3
      },
      (error: any) =>{
        console.log(error);
      }
    )
  }

  miStyle(){
    this._styleService.getStyles().subscribe(
      (option4: any[]) =>{
        this.listStyle = option4
      },
      (error: any) =>{
        console.log(error);
      }
    )
  }

  miSize(){
    this._sizeService.getSize().subscribe(
      (option5: any[]) =>{
        this.listSize = option5
      },
      (error: any) =>{
        console.log(error);
      }
    )
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

  addProducts() {
    const product: IProducts = {
      idcat: this.formProduct.get('idcat')?.value,
      idsize: this.formProduct.get('idsize')?.value,
      idstyles: this.formProduct.get('idstyles')?.value,
      idbrand: this.formProduct.get('idbrand')?.value,
      idcolor: this.formProduct.get('idcolor')?.value,
      name_p: this.formProduct.get('name_p')?.value,
      description: this.formProduct.get('name_brand')?.value,
      price: this.formProduct.get('name_brand')?.value,
      stock: this.formProduct.get('name_brand')?.value,
      image_front:this.uploadService.idFire,
      image_back:this.uploadService.idFire,
      image_using:this.uploadService.idFire,
      state: 1,
    };
    this._productService.addProduct(product).subscribe({
      next: () => {
        // console.log(JSON.stringify());
        this.toastr.success('La marca se agrego correctamente');
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      },
    });
  }
}
