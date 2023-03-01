import { Component } from '@angular/core';
import { ClaimService } from 'src/app/services/claim.service';
import { IClaims } from '../../../interfaces/IClaims';

@Component({
  selector: 'app-detail-claim',
  templateUrl: './detail-claim.component.html',
  styleUrls: ['./detail-claim.component.css']
})
export class DetailClaimComponent {
  id: number;
  listClaim2: IClaims[] =[];
  selectClaim: IClaims | any;

  constructor(
    private _claimsService: ClaimService
  ){
    this.id = 0
  }

  getOneClaim(id: number){
    this._claimsService.getOneClaim(id).subscribe((data: IClaims) =>{
      this.selectClaim = data;
      console.log(this.listClaim2)
    })
  }
}
