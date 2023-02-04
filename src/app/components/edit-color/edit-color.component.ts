import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.css']
})
export class EditColorComponent {
  formColor2: FormGroup;
  id: number;
  loading: boolean = false;


  constructor(
    private _colorService: ColorService,
    private cookiesService: CookieService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute

  ) {

    this.formColor2 = this.fb.group({
      name_col: ['', Validators.required],
      state: ['1', Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('idcolor'));
    console.log(this.id
      );
  }

  ngOnInit(): void {
 this.getOneColor(this.id)
  }

  getOneColor(id: number) {
    this.loading = true;

    this._colorService.getOneColor(id).subscribe((data: IColor) => {
      this.loading = false;
      this.formColor2.setValue({
        name_col: data.name_col,
        state: data.state,
      });

      console.log(data);
    });

  }

  updateColor() {
    this.loading = true;
    const color: IColor = {
      name_col: this.formColor2.value.name_col,
      state: this.formColor2.value.state,
    };
    color.idcolor = this.id;
    this._colorService.updateColor(this.id, color).subscribe(() => {
      this.toastr.success('El color se actualizo correctamente');
      this.loading = false;
      this.router.navigate(['/color']);

    });
  }
}
