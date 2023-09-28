import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'admin/user-details/:id', component: UserDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
