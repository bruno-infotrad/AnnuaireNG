import { Component, OnInit } from '@angular/core';
import { AppuserService } from '../../services/appuser.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;

  constructor(private appuserService: AppuserService) { }

  ngOnInit(): void {
    this.appuserService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
