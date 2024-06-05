import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserPost } from 'Models/UserPost';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  showFiller = false;
  isDrawerOpen = false;
  user!: UserPost | null;

  @Output() menuClicked = new EventEmitter<boolean>();
  constructor(public _authService: AuthService) {

   this.user = this._authService.getTokenUserInfo();

  }

  logOut() {
    this._authService.logout();
  }


}
