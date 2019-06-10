import { Component, OnInit } from '@angular/core';
import {ApiGatewayService} from '../services/api-gateway.service';
import {ResponseInterface} from '../interfaces/response-interface';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  private authService: AuthService;
  private apiGateway: ApiGatewayService;
  private _email = '';
  private _password = '';

  constructor(authService: AuthService, apiGateway: ApiGatewayService) {
    this.authService = authService;
    this.apiGateway = apiGateway;
  }

  ngOnInit() {
  }
  
  public doLogin() {
    this.apiGateway.doPost(
      '/loginCheck',
      {
        '_email': this._email,
        '_password': this._password
      }
    )
      .subscribe(
      (data: ResponseInterface) => {
        if (typeof data.data !== 'undefined') {
          const user = data.data;
          this.authService.afterLogin(user);
        }
        
        if (typeof data.error !== 'undefined') {
          const error = data.error;
          console.error(error);
        }
      },
        (error) => {
        console.error(error);
      }
    );
  }

}
