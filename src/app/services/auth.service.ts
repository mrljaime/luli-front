import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {UserInterface} from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  /**
   * Invoke after success login
   * @param user
   */
  public afterLogin(user: UserInterface) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', user.apiToken);
  }
  
  /**
   * Use to know if user is logged in
   *
   * @returns boolean
   */
  public isLoggedIn(): boolean {
    return null != localStorage.getItem('authToken');
  }
  
  /**
   * Get user object
   *
   * @returns UserInterface
   */
  public getUser(): UserInterface {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  /**
   * Use to clean all local storage when user is not logged in or token is reach
   */
  public doLogout() {
    localStorage.clear();
  }

  public getToken(): string {
     return localStorage.getItem('authToken');
  }
}
