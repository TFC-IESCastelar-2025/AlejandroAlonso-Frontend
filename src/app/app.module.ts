import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DailyComponent } from './pages/daily/daily.component';
import { SharedModule } from './shared/shared.modules';
import { InfiniteComponent } from './pages/infinite/infinite.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CustomModalComponent } from './shared/components/custom-modal/custom-modal.component';
import { RegisterComponent } from './pages/register/register.component';
import { MusicGuessComponent } from './pages/music-guess/music-guess.component';
import { BossSearchComponent } from './components/boss-search/boss-search.component';
import { MusicGuessInfiniteComponent } from './pages/music-guess-infinite/music-guess-infinite.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyComponent,
    InfiniteComponent,
    LoginComponent,
    CustomModalComponent,
    RegisterComponent,
    MusicGuessComponent,
    MusicGuessInfiniteComponent,
    BossSearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
