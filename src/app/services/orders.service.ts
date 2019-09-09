import {Injectable, OnInit} from '@angular/core';
import {ApiGatewayService} from './api-gateway.service';
import {OrderInterface} from '../interfaces/order-interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  private apiGateway: ApiGatewayService;
  
  constructor(apiGateway: ApiGatewayService) {
    this.apiGateway = apiGateway;
  }
  
  /**
   * Add order
   */
  public createOrder(formData: any) {
    return this.apiGateway.doPost('/orders/', formData);
  }
  
  /**
   * Get all orders
   *
   * @returns Observable<ResponseInterface>
   */
  public getOrders() {
    return this.apiGateway.doGet('/orders/', {});
  }
  
  /**
   * Get order by id
   *
   * @param id
   */
  public getOrder(id: number) {
    return this.apiGateway.doGet('/orders/' + id, {});
  }
  
  /**
   * Get elements by order
   *
   * @param id
   */
  public getProducts(id: number) {
    return this.apiGateway.doGet('/orders/' + id + '/products', {});
  }
  
  /**
   * Add element to order
   *
   * @param order
   * @param formData
   */
  public addElement(order: number, formData: any) {
    return this.apiGateway.doPost('/orders/' + order + '/addElements', formData);
  }
}
