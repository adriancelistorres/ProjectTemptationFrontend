import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'node_modules/ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent {
  listColor: IColor[] = [];
  loading: boolean = false;
  formColor: FormGroup;


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

  handleClear(){
    this.formColor = this.fb.group({
      name_col: ['', Validators.required],
    });
  }

  // redirect() {
  //   const params = Number(this.aRouter.snapshot.paramMap.get('idcolor'));
  //   this.id = Number(this.aRouter.snapshot.paramMap.get('idcolor'));
  //   if (this.id) {
  //   }
  //   this.router.navigate(['/color', '{{id}}']);
  // }

  getColors() {
    this.loading = true;
    setTimeout(() => {
      this._colorService.getColors().subscribe((data: IColor[]) => {
        this.listColor = data;
        this.loading = false;
      });
    }, 500);
  }

  // getOneColor(id: number) {
  //   this.loading = true;
  //   this._colorService.getOneColor(id).subscribe((data: IColor) => {
  //     this.loading = false;
  //     this.formColor2.setValue({
  //       name_col: data.name_col,
  //       state: data.state,
  //     });
  //     console.log(data);
  //   });
  // }



  deleteColor(id: number) {
    this.loading = true;
    this._colorService.deleteColor(id).subscribe(() => {
      this.getColors();
      this.toastr.warning('El color fue eliminado satisfactoriamente');
    });
    this.getColors();

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

  // updateColor() {
  //   const color: IColor = {
  //     name_col: this.formColor2.value.name_col,
  //     state: this.formColor2.value.state,
  //   };

  //   color.idcolor = this.id;
  //   this._colorService.updateColor(this.id, color).subscribe(() => {
  //     this.toastr.success('El color se actualizo correctamente');
  //     this.loading = false;
  //     this.getColors();
  //   });
  // }
}
