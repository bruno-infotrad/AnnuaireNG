import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NTI';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  siteLanguage: string = 'English';
  siteLocale: string = 'en';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.siteLocale = window.location.pathname.split('/')[1]||'en';
    console.log('siteLocal='+this.siteLocale);
    this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale)?.label||'English';
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const appuser = this.tokenStorageService.getAppuser();
      this.roles = appuser.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = appuser.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
