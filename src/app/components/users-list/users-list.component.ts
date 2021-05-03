import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { OrgService } from 'src/app/services/org.service';
import { Org } from '../../models/org.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  user?: User[];
  org: Org[] = [];
  currentUser?: User;
  currentIndex = -1;
  username = '';
  private roles: string[] = [];
  isLoggedIn = false;
  showEdit = false;
  appusername?: string;

  constructor(private userService: UserService, private orgService: OrgService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const appuser = this.tokenStorageService.getAppuser();
      this.roles = appuser.roles;
      this.showEdit = this.roles.includes('ROLE_ADMIN');
      this.appusername = appuser.username;
    }
    this.retrieveUsers();
    this.retrieveOrgs();
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.user = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = undefined;
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchUsername(): void {
    this.currentUser = undefined;
    this.currentIndex = -1;

    this.userService.findByUsername(this.username)
      .subscribe(
        data => {
          this.user = data;

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveOrgs(): void {
    this.orgService.getAll()
      .subscribe(
        data=> {
          this.org = data;
          console.log(this.org);
        },
        error => {
          console.log(error);
        });
  }

}
