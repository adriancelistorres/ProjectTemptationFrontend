import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.css'],
})
export class EditColorComponent  {
  formColor2: FormGroup;
  id: number;
  listColor: IColor[] = [];

  constructor(
    private _colorService: ColorService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.formColor2 = this.fb.group({
      name_col: ['', Validators.required],
      state: ['1', Validators.required],
    });
    this.id = 0;
    this._colorService.RefreshRequired.subscribe((result) => {
      this.getColors();
    });
  }

  getColors() {
    this._colorService.getColors().subscribe((data: IColor[]) => {
      this.listColor = data;
    });
  }

  getOneColor(id: number) {
    this._colorService.getOneColor(id).subscribe((data: IColor) => {
      this.formColor2.setValue({
        name_col: data.name_col,
        state: data.state,
      });
    });
    this.id = id;

  }

  updateColor() {
    const color: IColor = {
      name_col: this.formColor2.value.name_col,
      state: this.formColor2.value.state,
    };
    color.idcolor = this.id;
    this._colorService.updateColor(this.id, color).subscribe(() => {
      this.toastr.success('El color se actualizo correctamente');
    });
  }
}
