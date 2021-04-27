import { Component, OnInit } from '@angular/core';
import { OrgService } from 'src/app/services/org.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Org } from 'src/app/models/org.model';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.css']
})
export class OrgDetailsComponent implements OnInit {
  currentOrg: Org = {
    orgid: '',
    orgname: '',
    description: '',
  };
  message = '';

  constructor(
    private orgService: OrgService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getOrg(this.route.snapshot.params.id);
  }

  getOrg(id: string): void {
    this.orgService.get(id)
      .subscribe(
        data => {
          this.currentOrg = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateOrg(): void {
    this.message = '';

    this.orgService.update(this.currentOrg.id, this.currentOrg)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This org was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteOrg(): void {
    this.orgService.delete(this.currentOrg.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/orgs']);
        },
        error => {
          console.log(error);
        });
  }
}
