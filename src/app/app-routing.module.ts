import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyComponent } from './pages/daily/daily.component';
import { InfiniteComponent } from './pages/infinite/infinite.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
// import { InfiniteComponent } from './pages/infinite/infinite.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component'; 

const routes: Routes = [
    { path: 'daily', component: DailyComponent },
    { path: 'infinite', component: InfiniteComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'daily', pathMatch: 'full' }, // <- redirige a /daily por defecto
    { path: '**', redirectTo: 'daily' } // <- redirige a /daily por defecto
//   { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
