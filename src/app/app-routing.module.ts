import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/pages/dashboard/dashboard.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {BroadcastsComponent} from "./components/pages/broadcasts/broadcasts.component";
import {MediaLibraryComponent} from "./components/pages/media-library/media-library.component";
import {ScreensComponent} from "./components/pages/screens/screens.component";
import {ScreenGroupsComponent} from "./components/pages/screen-groups/screen-groups.component";
import {UsersComponent} from "./components/pages/users/users.component";
import {LayoutComponent} from "./components/shared/layout/layout.component";

const routes: Route[] = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'broadcasts', component: BroadcastsComponent },
      { path: 'media-library', component: MediaLibraryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'screen-groups', component: ScreenGroupsComponent },
      { path: 'screens', component: ScreensComponent },
      { path: 'users', component: UsersComponent },
    ]
  },
  { path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
