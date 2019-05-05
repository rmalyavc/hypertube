import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{
		path: 'profile/:id',
		component: ProfileComponent
	},
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProfileComponent, HomeComponent];
