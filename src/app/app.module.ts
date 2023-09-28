import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchEditComponent } from './branches/branch-edit/branch-edit.component';
import { BranchListComponent } from './branches/branch-list/branch-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BranchItemComponent } from './branches/branch-item/branch-item.component';
import { DataStorageService } from './shared/datastorage.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BranchesComponent,
    BranchEditComponent,
    BranchListComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    BranchItemComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: [HTTP_INTERCEPTORS],
    useClass: AuthInterceptorService,
    multi: true
  }, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
