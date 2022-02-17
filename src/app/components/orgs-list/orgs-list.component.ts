import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Org } from 'src/app/models/org.model';
import { OrgService } from 'src/app/services/org.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-orgs-list',
  templateUrl: './orgs-list.component.html',
  styleUrls: ['./orgs-list.component.css']
})
export class OrgsListComponent implements OnInit {
  org?: Org[];
  currentUser?: User;
  currentOrg?: Org;
  currentIndex = -1;
  orgname = '';
  private roles: string[] = [];
  isLoggedIn = false;
  showEdit = false;
  appusername?: string;

  constructor(private OrgService: OrgService, private orgService: OrgService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const appuser = this.tokenStorageService.getAppuser();
      this.roles = appuser.roles;
      this.showEdit = this.roles.includes('ROLE_ADMIN');
      this.appusername = appuser.username;
    }
    this.retrieveOrgs();
  }

  retrieveOrgs(): void {
    this.orgService.getAll()
      .subscribe(
        data => {
          this.org = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveOrgs();
    this.currentOrg = undefined;
    this.currentIndex = -1;
  }

  setActiveOrg(org: Org, index: number): void {
    this.currentOrg = org;
    this.currentIndex = index;
  }

  removeAllOrgs(): void {
    this.orgService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchOrgname(): void {
    this.currentOrg = undefined;
    this.currentIndex = -1;

    this.orgService.findByOrgname(this.orgname)
      .subscribe(
        data => {
          this.org = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
