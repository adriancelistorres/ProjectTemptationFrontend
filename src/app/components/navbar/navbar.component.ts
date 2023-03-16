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
  person: any | string
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
    this.person = localStorage.getItem('username');
    console.log('LOGmenu', this.rol);
    // this.isDisabled = this.rol === 2;
  }

}
