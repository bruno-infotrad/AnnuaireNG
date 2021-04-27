import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { OrgsListComponent } from './components/orgs-list/orgs-list.component';
import { OrgDetailsComponent } from './components/org-details/org-details.component';
import { AddOrgComponent } from './components/add-org/add-org.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'orgs', component: OrgsListComponent },
  { path: 'orgs/:id', component: OrgDetailsComponent },
  { path: 'addorg', component: AddOrgComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

