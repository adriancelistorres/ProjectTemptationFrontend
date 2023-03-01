import { Component, ViewChild } from '@angular/core';
import { IClaims } from '../../../interfaces/IClaims';
import { ClaimService } from '../../../services/claim.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { ErrorService } from '../../../utils/error/error.service';
import { DetailClaimComponent } from '../detail-claim/detail-claim.component';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { AceptClaimComponent } from '../acept-claim/acept-claim.component';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent {
  listClaim: IClaims[] =[];
  searchText: any;
  constructor(
    private _claimService: ClaimService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this._claimService.RefreshRequired.subscribe(result =>{
      this.getClaims();
    })
  }

  @ViewChild(DetailClaimComponent)detailview!: DetailClaimComponent;
  @ViewChild(AceptClaimComponent)aceptview!: AceptClaimComponent;
  ngOnInit(): void {
    this.getClaims();
  }

  getClaims(){
    this._claimService.getClaims().subscribe((data: IClaims[])=>{
      this.listClaim = data;
    })
  }

  acept(id: number){
    this.aceptview.getOneClaim(id);
    console.log(id);
  }

  GetOneClaim(id: number) {
    this.detailview.getOneClaim(id);
    console.log(id)
  }

  deleteClaim(id: number){
    Swal.fire({
      title: 'Seguro que desea Rechazar',
      text: 'Se rechazará el reclamo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) =>{
      if(result.isConfirmed){
        this._claimService.deleteClaim(id).subscribe({next:() =>{
          this.getClaims();
          this.toastr.success('El reclamo fue rechazado Correctamente')
        },error: (e:HttpErrorResponse) =>{
          this._errorService.msjError(e)
        }})
      }
    })
  }











}

