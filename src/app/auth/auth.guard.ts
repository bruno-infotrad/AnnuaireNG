import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree{
      const url: string = state.url;

      return this.checkLogin(url);
    }

    checkLogin(url: string): true|UrlTree {
      if (!!this.tokenStorageService.getToken()) {
        return true;
      } else {
        this.router.navigate(['/login'], {
          queryParams: {
            return: url
          }
        });
        return this.router.parseUrl('/login');
      }
    }
}
