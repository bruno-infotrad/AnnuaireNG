import { Component, OnInit } from '@angular/core';
import { AppuserService } from '../../services/appuser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  isLoggedIn = false;

  constructor(private appuserService: AppuserService) { }

  ngOnInit(): void {
        this.appuserService.getPublicContent().subscribe(
          data => {
            this.content = data;
          },
          err => {
            this.content = JSON.parse(err.error).message;
          }
        );
  }
}
