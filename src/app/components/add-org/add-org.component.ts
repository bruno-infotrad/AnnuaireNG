import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/models/org.model';
import { OrgService } from 'src/app/services/org.service';

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

  constructor(private orgService: OrgService) { }

  ngOnInit(): void {
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
