import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'node_modules/ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/utils/error/error.service';
import { AddColorComponent } from '../add-color/add-color.component';
import { EditColorComponent } from '../edit-color/edit-color.component';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent  {
  listColor: IColor[] = [];
  searchText: any;

  constructor(
    private _colorService: ColorService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorServie: ErrorService,

  ) {
    this._colorService.RefreshRequired.subscribe(result=>{
      this.getColors()
    })
  }

  @ViewChild(EditColorComponent) addview!: EditColorComponent ;

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
      this._colorService.getColors().subscribe((data: IColor[]) => {
        this.listColor = data;
      });
    ;
  }

  edit(id: number) {
    this.addview.getOneColor(id);
    this.getColors();
    console.log(id)
  }

  deleteColor(id: number) {
    Swal.fire({
      title: 'Seguro que desea eliminarlo?',
      text: "Se eliminara el color",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',

    }).then((result) => {
      if (result.isConfirmed) {
        this._colorService.deleteColor(id).subscribe({next:() => {
          this.getColors();
          this.toastr.success('El color fue eliminado satisfactoriamente');
        },
        error: (e: HttpErrorResponse) => {
          this._errorServie.msjError(e);
        } });

      }
    });


  }


}
