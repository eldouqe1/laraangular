import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService {

  constructor(private Token: TokenService) { }
  canActivate(route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot):  boolean |
                                Observable<boolean > |
                                Promise<boolean > 
  {
      return !this.Token.loggedIn();
  }
}
