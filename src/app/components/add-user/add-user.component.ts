import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { OrgService } from 'src/app/services/org.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Org } from '../../models/org.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = {
    username: '',
    firstname: '',
    lastname: '',
    title: '',
    description: '',
    published: false
  };
  org: Org[] = [];
  submitted = false;
  private roles: string[] = [];
  isLoggedIn = false;
  showAddUser = false;
  username?: string;


  constructor(private userService: UserService, private orgService: OrgService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const appuser = this.tokenStorageService.getAppuser();
      this.roles = appuser.roles;
      this.showAddUser = this.roles.includes('ROLE_ADMIN');
      this.username = appuser.username;
      this.retrieveOrgs();
    }

  }

  saveUser(): void {
    const data = {
      username: this.user.username,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      title: this.user.title,
      description: this.user.description,
      organization: this.user.organization
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      username: '',
      firstname: '',
      lastname: '',
      title: '',
      description: '',
      published: false
    };
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
