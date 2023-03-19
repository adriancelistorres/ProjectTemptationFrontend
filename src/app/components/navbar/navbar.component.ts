import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  rol:any|number;
  username: any | string
  dni: any
  lastname: any
  name: any

  isDisabled: boolean|any;

  constructor(  private cookiesService: CookieService,  private router: Router ){}

  deleteCookie() {
    this.cookiesService.delete('token');
    localStorage.removeItem('rollogin');

    this.router.navigate(['/login']);

  }


  ngOnInit(): void {
    this.rol = localStorage.getItem('rollogin');
    console.log('LOGmenu', this.rol);
    this.username = localStorage.getItem('username');
    console.log('username', this.username);
    this.name = localStorage.getItem('name');
    this.lastname = localStorage.getItem('lastname');
    this.dni = localStorage.getItem('dni');

    // this.isDisabled = this.rol === 2;
  }

}
