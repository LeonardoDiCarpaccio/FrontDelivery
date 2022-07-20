import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { MediaLibraryComponent } from './components/pages/media-library/media-library.component';
import { UsersComponent } from './components/pages/users/users.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormsModule } from '@angular/forms';
import { PersonUpdateModalComponent } from './components/shared/modal/person-update-modal/person-update-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './components/shared/toast/toast.component';
import { GenericTableComponent } from './components/genericComponent/generic-table/generic-table.component';
import { GenericModalInsertComponent } from './components/genericComponent/generic-modal-insert/generic-modal-insert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MediaLibraryComponent,
    UsersComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    LayoutComponent,
    PersonUpdateModalComponent,
    ToastComponent,
    GenericTableComponent,
    GenericModalInsertComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SimpleModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      toastComponent: ToastComponent,
    }),
  ],
  entryComponents: [
    ToastComponent,
    PersonUpdateModalComponent,
    GenericModalInsertComponent,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
