import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() role: string = '';

  constructor(  private cookiesService: CookieService,  private router: Router ){}

  deleteCookie() {
    this.cookiesService.delete('token');
    localStorage.removeItem('rollogin');

    this.router.navigate(['/login']);

  }
}
