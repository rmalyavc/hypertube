import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { HeaderComponent } from './header/header.component';
import { ToolsComponent } from './tools/tools.component';
import { ToolComponent } from './tool/tool.component';
import { UserService } from './user.service';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BaseComponent } from './base/base.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { SliderComponent } from './slider/slider.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { WatchComponent } from './watch/watch.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { PlayerComponent } from './player/player.component';
import { CommentsComponent } from './comments/comments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryComponent } from './history/history.component';
import { ScrollTracker } from './scroll-tracker.directive';
import { FogComponent } from './fog/fog.component';
import { LoaderComponent } from './loader/loader.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainSectionComponent,
    HeaderComponent,
    ToolsComponent,
    ToolComponent,
    ProfileComponent,
    HomeComponent,
    BaseComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    SliderComponent,
    SearchResultsComponent,
    WatchComponent,
    NotFoundComponent,
    FilmDetailsComponent,
    PlayerComponent,
    CommentsComponent,
    HistoryComponent,
    ScrollTracker,
    FogComponent,
    LoaderComponent,
    CompleteRegistrationComponent,
    RestorePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
