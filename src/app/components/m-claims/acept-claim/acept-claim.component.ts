import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IClaims } from '../../../interfaces/IClaims';
import { ClaimService } from '../../../services/claim.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../utils/error/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-acept-claim',
  templateUrl: './acept-claim.component.html',
  styleUrls: ['./acept-claim.component.css']
})
export class AceptClaimComponent {
  formClaim2: FormGroup;
  id: number;
  ListClaim: IClaims[] = [];
  constructor(
    private _claimService: ClaimService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formClaim2 = this.fb.group({
      idorder: ['',Validators.required],
      subject: ['',Validators.required],
      descripcion: ['',Validators.required],
      date: [''],
      image: ['',Validators.required],
      // state:['',Validators.required]
    });
    this.id = 0;
    this._claimService.RefreshRequired.subscribe((result) =>{
      this.getClaim();
    })
  }

  getClaim(){
    this._claimService.getClaims().subscribe((data: IClaims[])=>{
      this.ListClaim = data;
    })
  }

  getOneClaim(id:number){
    this._claimService.getOneClaim(id).subscribe((data: IClaims)=>{
      this.formClaim2.setValue({
        idorder: data.idorder,
        subject: data.subject,
        descripcion: data.descripcion,
        date: data.date,
        image: data.image
      })
    });
    this.id =  id;
  }

  updateClaim(){
    const claim: IClaims ={
      idorder: this.formClaim2.value.idorder,
      subject: this.formClaim2.value.subject,
      descripcion: this.formClaim2.value.descripcion,
      date: this.formClaim2.value.date,
      image: this.formClaim2.value.image,
      state: 2,
    }
    claim.idclaims = this.id;
    console.log(claim)
    this._claimService.updateClaim(this.id, claim).subscribe({next:()=>{
      // console.log(JSON.stringify());
      this.toastr.success('El reclamo ha sido aceptado correctamente');
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})
  }



}
