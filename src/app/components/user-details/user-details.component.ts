import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { OrgService } from 'src/app/services/org.service';
import { Org } from '../../models/org.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser: User = {
    username: '',
    title: '',
    description: '',
    image: '' 
  };
  org: Org[] = [];
  message = '';
  private roles: string[] = [];
  isLoggedIn = false;
  showModUser = false;
  showModButtons = false;
  appusername?: string;
  b64 = '';



  constructor(
    private userService: UserService,
    private orgService: OrgService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const appuser = this.tokenStorageService.getAppuser();
      this.getUser(this.route.snapshot.params.id);
      this.roles = appuser.roles;
      this.showModUser = this.roles.includes('ROLE_ADMIN');
      this.appusername = appuser.username;
      /* The statement below will not work because it is an asynchronous call
      if (this.appusername == this.currentUser.username)
      {
        this.showModButtons = true;
      }
      console.log('currentUser.id='+this.currentUser.id);
      console.log('appuser='+JSON.stringify(appuser));
      console.log('currentUser='+JSON.stringify(this.currentUser));
      console.log('this.appusername='+this.appusername);
      console.log('this.currentUser.username='+this.currentUser.username);
      console.log('showModUser='+this.showModUser);
      console.log('showModButtons='+this.showModButtons);
      */
      this.retrieveOrgs();
    }
    this.message = '';
    this.retrieveOrgs();
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log("getUser for "+id+"="+JSON.stringify(data));
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This user was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
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
