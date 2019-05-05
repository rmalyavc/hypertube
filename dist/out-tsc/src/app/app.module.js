import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
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
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                FooterComponent,
                MainSectionComponent,
                HeaderComponent,
                ToolsComponent,
                ToolComponent,
                ProfileComponent,
                HomeComponent,
                BaseComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                FormsModule
            ],
            providers: [UserService],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map