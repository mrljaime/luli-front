import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserInterface} from '../interfaces/user-interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  private authService: AuthService;
  private user: UserInterface;
  constructor(authService: AuthService) {
    this.authService = authService;
    this.user = this.authService.getUser();
  }

  ngOnInit() {
  }

}
