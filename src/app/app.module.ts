import { NgModule, TRANSLATIONS } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CookieService } from 'node_modules/ngx-cookie-service';
import { ColorComponent } from './components/m-color/color/color.component';
import { TokenInterceptorService } from './shared/token/token-interceptor.service';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { EditColorComponent } from './components/m-color/edit-color/edit-color.component';
import { AddColorComponent } from './components/m-color/add-color/add-color.component';
import { PipesPipe } from './shared/pipes/pipes.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoryComponent } from './components/m-category/category/category.component';
import { AddCategoryComponent } from './components/m-category/add-category/add-category.component';
import { EditCategoryComponent } from './components/m-category/edit-category/edit-category.component';
import { StylessComponent } from './components/m-styles/styless/styless.component';
import { AddStylesComponent } from './components/m-styles/add-styles/add-styles.component';
import { EditStylesComponent } from './components/m-styles/edit-styles/edit-styles.component';
import { ProductComponent } from './components/m-product/product/product.component';
import { AddProductComponent } from './components/m-product/add-product/add-product.component';
import { EditProductComponent } from './components/m-product/edit-product/edit-product.component';
import { BrandComponent } from './components/m-brand/brand/brand.component';
import { AddBrandComponent } from './components/m-brand/add-brand/add-brand.component';
import { EditBrandComponent } from './components/m-brand/edit-brand/edit-brand.component';
import { SizeComponent } from './components/m-size/size/size.component';
import { AddSizeComponent } from './components/m-size/add-size/add-size.component';
import { EditSizeComponent } from './components/m-size/edit-size/edit-size.component';
import { RolComponent } from './components/m-rol/rol/rol.component';
import { AddRolComponent } from './components/m-rol/add-rol/add-rol.component';
import { EditRolComponent } from './components/m-rol/edit-rol/edit-rol.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigInComponent,
    MenuComponent,
    NavbarComponent,
    SpinnerComponent,
    NotfoundComponent,
    ColorComponent,
    ProgressBarComponent,
    EditColorComponent,
    AddColorComponent,
    PipesPipe,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    StylessComponent,
    AddStylesComponent,
    EditStylesComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    BrandComponent,
    AddBrandComponent,
    EditBrandComponent,
    SizeComponent,
    AddSizeComponent,
    EditSizeComponent,
    RolComponent,
    AddRolComponent,
    EditRolComponent,

  ],
  imports: [
    BrowserModule,Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,}), // ToastrModule added
      ReactiveFormsModule,


  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
