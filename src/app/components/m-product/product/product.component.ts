import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs';
import { FileUpload } from 'src/app/shared/models/file-upload.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

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
  // @Input() fileUpload!: FileUpload;

  constructor(private uploadService: FileUploadService) {}
  ngOnInit(): void {
    this.uploadService
      .getFiles(1000000)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads) => {
        this.fileUploads = fileUploads;
        console.log('one', fileUploads);
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // upload(): void {
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     this.selectedFiles = undefined;

  //     if (file) {
  //       this.currentFileUpload = new FileUpload(file);

  //       this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
  //         (percentage) => {
  //           this.percentage = Math.round(percentage ? percentage : 0);

  //           console.log('PERCENTAGE', this.percentage);

  //           if (this.percentage == 100) {
  //             console.log('ID_KEY_POLLO_1', this.uploadService.idFire);
  //             setTimeout(() => {
  //               console.log('ID_KEY_POLLO_2', this.uploadService.idFire);
  //             }, 1500);
  //           }

  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     }
  //   }
  // }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
