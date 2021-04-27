import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/models/org.model';
import { OrgService } from 'src/app/services/org.service';

@Component({
  selector: 'app-orgs-list',
  templateUrl: './orgs-list.component.html',
  styleUrls: ['./orgs-list.component.css']
})
export class OrgsListComponent implements OnInit {
  org?: Org[];
  currentOrg?: Org;
  currentIndex = -1;
  orgname = '';

  constructor(private orgService: OrgService) { }

  ngOnInit(): void {
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
