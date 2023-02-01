import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import{HttpClientModule} from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CookieService } from 'node_modules/ngx-cookie-service';
import { ColorComponent } from './components/color/color.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigInComponent,
    MenuComponent,
    NavbarComponent,
    SpinnerComponent,
    NotfoundComponent,
    ColorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,}), // ToastrModule added
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
