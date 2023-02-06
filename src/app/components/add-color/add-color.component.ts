import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit{
  listColor: IColor[] = [];
  loading: boolean = false;
  formColor: FormGroup;
  searchText: any;


  constructor(private _colorService: ColorService,
    private cookiesService: CookieService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private _errorServie: ErrorService,){
      this.formColor = this.fb.group({
        name_col: ['', Validators.required],
        state: ['1', Validators.required],
      });


  }
  ngOnInit(): void {
    this.getColors();
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

  addColor() {
    const color: IColor = {
      name_col: this.formColor.get('name_col')?.value,
      state: this.formColor.get('state')?.value,
    };
    this._colorService.addColor(color).subscribe(() => {
      this.toastr.success('El color se agrego correctamente');
      this.getColors();
      window.location.reload();

    });
  }

}
