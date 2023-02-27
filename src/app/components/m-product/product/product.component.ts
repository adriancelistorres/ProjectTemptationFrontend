import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { map } from 'rxjs';
import { IProducts } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { FileUpload } from 'src/app/shared/models/file-upload.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  searchText: any;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads?: any[];
  listProducts: IProducts[] = [];

  // @Input() fileUpload!: FileUpload;

  constructor(
    private uploadService: FileUploadService,
    private _productService: ProductService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) {
    this._productService.RefreshRequired.subscribe((result) => {
      this.getProducts();
    });
  }

  @ViewChild(EditProductComponent) addview!: EditProductComponent;

  ngOnInit(): void {
    // this.uploadService
    //   .getFiles(1000000)
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) =>
    //       changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
    //     )
    //   )
    //   .subscribe((fileUploads) => {
    //     this.fileUploads = fileUploads;
    //     console.log('one', fileUploads);

    //   });
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe((data: IProducts[]) => {
      this.listProducts = data;
    });
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

  deleteRol(id: number) {
    Swal.fire({
      title: 'Seguro que desea eliminarlo?',
      text: 'Se eliminara el color',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProducts(id).subscribe({
          next: () => {
            this.getProducts();
            this.toastr.success('El rol fue eliminado satisfactoriamente');
          },
          error: (e: HttpErrorResponse) => {
            this._errorService.msjError(e);
          },
        });
      }
    });
  }
}
