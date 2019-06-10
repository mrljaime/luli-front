import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ResponseInterface} from '../interfaces/response-interface';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {

  private httpClient: HttpClient;

  private authService: AuthService;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.authService = authService;
  }
  
  /**
   * Make a GET request to path provided
   *
   * @param path
   * @param params
   */
  public doGet(path: string, params: any): Observable<ResponseInterface> {
    const endpoint = environment.apiGateway + path;

    return this.httpClient.request<ResponseInterface>('GET', endpoint, {
      headers: this.buildHeaders(),
      params: params
    });
  }
  
  /**
   * Make a POST request to path provided
   *
   * @param path
   * @param params
   */
  public doPost(path: string, params: any) {
    const endpoint = environment.apiGateway + path;
    
    return this.httpClient.request<ResponseInterface>('POST', endpoint, {
      headers: this.buildHeaders(),
      body: params
    });
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json;utf8',
      'Accept': 'application/json,text/html; charset=UTF-8',
      'X-Custom-Auth': (null != this.authService.getToken()) ? this.authService.getToken() : ''
  });
  }

}
