import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { WatchComponent } from './watch/watch.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryComponent } from './history/history.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';

const routes: Routes = [
	{
		path: 'profile/:id',
		component: ProfileComponent
	},
	{
		path: 'history/:id',
		component: HistoryComponent
	},
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'register/verify/:token',
		component: CompleteRegistrationComponent
	},
	{
		path: 'search',
		component: SearchComponent,
	},
	{
		path: 'search/results',
		component: SearchResultsComponent,
	},
	{
		path: 'watch/:id',
		component: WatchComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProfileComponent, HomeComponent];
