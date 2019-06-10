import { Injectable } from '@angular/core';
import {ApiGatewayService} from './api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private apiGateway: ApiGatewayService;
  
  constructor(apiGateway: ApiGatewayService) {
    this.apiGateway = apiGateway;
  }
  
  /**
   * Make an api request to get all products
   *
   * @returns Observable<ResponseInterface>
   */
  public getProducts() {
    return this.apiGateway.doGet('/products/', {});
  }
  
  /**
   * Make an api request to get a product by id
   *
   * @param id
   * @return Observable<ResponseInterface>
   */
  public getProduct(id: number) {
    return this.apiGateway.doGet('/products/' + id, {});
  }
  
  /**
   * Make an api request to get product by provider
   *
   * @param providerId
   * @param query
   * @return Observable<ResponseInterface>
   */
  public getByProvider(providerId: number, query: any) {
    return this.apiGateway.doGet('/products/find', {
      'provider': providerId,
      'q': query
    });
  }
  
  /**
   * Make an api request to create a new product providing provider, category and subcategory
   *
   * @param providerId
   * @param categoryId
   * @param subCategoryId
   * @param name
   * @param description
   * @param price
   * @param qty
   * @param active
   */
  public create(
    providerId: number,
    categoryId: number,
    subCategoryId: number,
    name: string,
    description: string,
    price: number,
    qty: number,
    active: boolean
  ) {
    return this.apiGateway.doPost('/products/', {
      provider: providerId,
      category: categoryId,
      subCategory: subCategoryId,
      name: name,
      description: description,
      price: price,
      qty: qty,
      active: active
    });
  }
  
  /**
   * Use to save updated product
   * @param id
   * @param data
   */
  public updateProduct(id: number, data: any) {
    return this.apiGateway.doPost('/products/' + id, data);
  }
}
