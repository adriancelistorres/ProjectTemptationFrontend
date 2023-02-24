import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from '../models/file-upload.model';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';
  idFire: string|null = '';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

   uploadTask.then((res) => console.log('RESULTADO', res.ref.getMetadata()));

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload).then((res) => {
      console.log('resultado', res.key);
      this.idFire = res.key;
    });
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload | any): void {
    this.getOneFile(fileUpload);
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }

  getOneFile(fileUpload: FileUpload | any): void {
    const keynew = fileUpload.key;
    console.log('keynew', keynew);
    // return this.db.list(this.basePath).update(key, { name: 'test' });
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
