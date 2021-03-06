import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { OrgService } from 'src/app/services/org.service';
import { Org } from '../../models/org.model';

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

  constructor(private userService: UserService, private orgService: OrgService) { }

  ngOnInit(): void {
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
