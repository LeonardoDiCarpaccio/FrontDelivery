import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { MediaLibraryComponent } from './components/pages/media-library/media-library.component';

import { UsersComponent } from './components/pages/users/users.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { OrderApprovedComponent } from './components/pages/order-approved/order-approved.component';
import { OrderWaitingComponent } from './components/pages/order-waiting/order-waiting.component';
import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';
import { OrderTravellingComponent } from './components/pages/order-travelling/order-travelling.component';
import { AuthAdminGuard } from './Guards/auth-admin.guard';
import { ConnectedClientGuard } from './Guards/connected-client.guard';
import { MyorderComponent } from './components/pages/myorder/myorder.component';
import { MyorderArchivedComponent } from './components/pages/myorder-archived/myorder-archived.component';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ConnectedClientGuard],
      },
      {
        path: 'order-approved',
        component: OrderApprovedComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'order-waiting',
        component: OrderWaitingComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'order-travelling',
        component: OrderTravellingComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'myorder',
        component: MyorderComponent,
        canActivate: [ConnectedClientGuard],
      },
      {
        path: 'myorder-archived',
        component: MyorderArchivedComponent,
        canActivate: [ConnectedClientGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [ConnectedClientGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthAdminGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
