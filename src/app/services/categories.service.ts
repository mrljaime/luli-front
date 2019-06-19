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
   * @param data
   */
  public createCategory(data: any) {
    return this.apiGateway.doPost('/categories/', data);
  }
  
  /**
   *
   * @param category
   * @returns Observable<ResponseInterface>
   */
  public getSubCategories() {
    return this.apiGateway.doGet('/subCategories/', {});
  }
  
  /**
   *
   * @param data
   */
  public createSubCategory(data: any) {
    return this.apiGateway.doPost('/subCategories/', data);
  }
}
