import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { OrgsListComponent } from './components/orgs-list/orgs-list.component';
import { OrgDetailsComponent } from './components/org-details/org-details.component';
import { AddOrgComponent } from './components/add-org/add-org.component';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard]  },
  { path: 'orgs', component: OrgsListComponent, canActivate: [AuthGuard]  },
  { path: 'orgs/:id', component: OrgDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'addorg', component: AddOrgComponent, canActivate: [AuthGuard]  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  //{ path: 'user', component: BoardUserComponent },
  //{ path: 'mod', component: BoardModeratorComponent },
  //{ path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  //imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

