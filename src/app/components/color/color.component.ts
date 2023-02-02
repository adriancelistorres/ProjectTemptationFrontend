import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {
  listColor:IColor[]=[]

  constructor(private _colorService:ColorService, private cookiesService:CookieService,){
  }
  ngOnInit():void{
    this.getColors();
  }

  getColors(){
    this._colorService.getColor().subscribe((data)=>{
      // this.cookiesService.set('token',JSON.stringify(data),1)

      this.listColor=data
      console.log(data)
    })


  }

}
