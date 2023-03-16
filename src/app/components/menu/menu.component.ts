import { Component, Input, OnInit } from '@angular/core';
import { DatasharingService } from 'src/app/shared/sharedService/datasharing.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit{
  rol:any|number;


  constructor(public sharedService: DatasharingService) {}

  ngOnInit(): void {
    // this.rol = localStorage.getItem('rollogin');
    // console.log('LOGmenu', this.rol);

  }

  // getadata(){
  //   this.sharedService.disparador.subscribe(data=>{
  //     console.log('data',data)
  //     const rol = data.data;
  //     console.log('newrol',rol)
  //     this.rol=rol;
  //     console.log('thisrol',this.rol);
  //     // this.rolnew=rol;
  //     // console.log('log thisrolnew',this.rolnew);
  //     //guardar ls
  //     //recuperar ls
  //     localStorage.setItem('rol', this.rol);
  //     var rolAlmacenado = localStorage.getItem('rol');
  //     console.log('LOG',rolAlmacenado);


  //   })
  // }
}
