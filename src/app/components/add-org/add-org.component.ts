import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/models/org.model';
import { OrgService } from 'src/app/services/org.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css']
})
export class AddOrgComponent implements OnInit {
  org: Org = {
    orgid: '',
    orgname: '',
    description: '',
  };
  submitted = false;
  private roles: string[] = [];
  isLoggedIn = false;
  showAddOrg = false;
  username?: string;


  constructor(private orgService: OrgService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const appuser = this.tokenStorageService.getAppuser();
      this.roles = appuser.roles;
      this.showAddOrg = this.roles.includes('ROLE_ADMIN');
      this.username = appuser.username;
    }
  }

  saveOrg(): void {
    const data = {
      orgid: this.org.orgid,
      orgname: this.org.orgname,
      description: this.org.description
    };

    this.orgService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newOrg(): void {
    this.submitted = false;
    this.org = {
      orgid: '',
      orgname: '',
      description: '',
    };
  }

}
