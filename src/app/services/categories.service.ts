import { Injectable } from '@angular/core';
import {ApiGatewayService} from './api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  private apiGateway: ApiGatewayService;

  constructor(apiGateway: ApiGatewayService) {
    this.apiGateway = apiGateway;
  }
  
  /**
   * @returns Observable<ResponseInterface>
   */
  public getCategories() {
    return this.apiGateway.doGet('/categories/', {});
  }
  
  /**
   *
   * @param category
   * @returns Observable<ResponseInterface>
   */
  public getSubCategories() {
    return this.apiGateway.doGet('/subCategories/', {});
  }
}
