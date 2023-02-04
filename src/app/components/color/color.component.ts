import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'node_modules/ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  listColor: IColor[] = [];
  loading: boolean = false;
  formColor: FormGroup;
  searchText: any;

  constructor(
    private _colorService: ColorService,
    private cookiesService: CookieService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.formColor = this.fb.group({
      name_col: ['', Validators.required],
      state: ['1', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getColors();
  }

  handleClear() {
    this.formColor = this.fb.group({
      name_col: ['', Validators.required],
    });
  }


  getColors() {
    this.loading = true;
    setTimeout(() => {
      this._colorService.getColors().subscribe((data: IColor[]) => {
        this.listColor = data;
        this.loading = false;
      });
    }, 500);
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
        this.loading = true;
        this._colorService.deleteColor(id).subscribe(() => {
          this.getColors();
          // this.toastr.warning('El color fue eliminado satisfactoriamente');
        });
        this.getColors();
        Swal.fire('Se Elimino Correctamente', 'success');
      }
    });


  }

  addColor() {
    const color: IColor = {
      name_col: this.formColor.get('name_col')?.value,
      state: this.formColor.get('state')?.value,
    };
    this._colorService.addColor(color).subscribe(() => {
      this.toastr.success('El color se agrego correctamente');
      this.getColors();
    });
  }
}
