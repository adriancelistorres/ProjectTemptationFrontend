import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IStyles } from 'src/app/interfaces/IStyles';
import { StylesService } from 'src/app/services/styles.service';

@Component({
  selector: 'app-edit-styles',
  templateUrl: './edit-styles.component.html',
  styleUrls: ['./edit-styles.component.css']
})
export class EditStylesComponent {
  formStyle2: FormGroup;
  id:number;
  listStyle: IStyles[] = [];

  constructor(
    private _styleService: StylesService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ){
    this.formStyle2 = this.fb.group({
      name_sty: ['', Validators.required],
      state: ['1',Validators.required],
    });
    this.id=0;
    this._styleService.RefreshRequired.subscribe((result) =>{
      this.getStyles();
    })
  }

  getStyles(){
    this._styleService.getStyles().subscribe((data: IStyles[]) =>{
      this.listStyle = data;
    });
  }

  getOneStyle(id:number){
    this._styleService.getOneStyle(id).subscribe((data:IStyles) =>{
      this.formStyle2.setValue({
        name_sty: data.name_sty,
        state: data.state,
      });
    });
    this.id = id;
  }

  updateStyle(){
    const style: IStyles ={
      name_sty: this.formStyle2.value.name_sty,
      state: this.formStyle2.value.state,
    };
    style.idstyles = this.id;
    this._styleService.updateStyle(this.id, style).subscribe(() =>{
      this.toastr.success("El Estilo se actualizo Correctamente");
    });
  }
}
