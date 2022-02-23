import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;
  private roles: string[] = [];
  showEdit = false;
  appusername?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorageService.getAppuser();
      //this.roles = appuser.roles;
      this.showEdit = this.currentUser.roles.includes('ROLE_ADMIN');
      //this.appusername = appuser.username;
    }
  }
}
