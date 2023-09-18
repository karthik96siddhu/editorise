import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: 'admin/user-details/:id', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
