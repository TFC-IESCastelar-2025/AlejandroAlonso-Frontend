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
import { RegisterComponent } from './pages/register/register.component';
import { MusicGuessComponent } from './pages/music-guess/music-guess.component';
import { BossSearchComponent } from './components/boss-search/boss-search.component';
import { MusicGuessInfiniteComponent } from './pages/music-guess-infinite/music-guess-infinite.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BestiaryComponent } from './pages/bestiary/bestiary.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StartMenuComponent } from './pages/start-menu/start-menu.component';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VictoryDeathOverlayComponent } from './components/victory-death-overlay/victory-death-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyComponent,
    InfiniteComponent,
    LoginComponent,
    RegisterComponent,
    MusicGuessComponent,
    MusicGuessInfiniteComponent,
    BossSearchComponent,
    ProfileComponent,
    BestiaryComponent,
    AudioPlayerComponent,
    VerifyEmailComponent,
    RankingComponent,
    StartMenuComponent,
    MenuBarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VictoryDeathOverlayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
