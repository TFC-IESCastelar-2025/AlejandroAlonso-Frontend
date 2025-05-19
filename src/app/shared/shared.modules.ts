import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      NavbarComponent,
      FooterComponent,
      PaginatorComponent,
      CustomModalComponent
    ],
    imports: [
      CommonModule,    
      RouterModule,
      BrowserModule,
      HttpClientModule,
      NgxPaginationModule,
      AppRoutingModule,
      FormsModule
    ],
    exports: [
       NavbarComponent,
       FooterComponent,
       PaginatorComponent,
       CustomModalComponent
    ]
  })
  export class SharedModule { }