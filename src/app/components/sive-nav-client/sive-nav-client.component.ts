import { Component, EventEmitter, Output } from '@angular/core';
import { UserPost } from 'Models/UserPost';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-sive-nav-client',
  templateUrl: './sive-nav-client.component.html',
  styleUrls: ['./sive-nav-client.component.css']
})
export class SiveNavClientComponent {
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
