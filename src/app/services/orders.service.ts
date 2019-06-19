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
   * Get all orders
   *
   * @returns Observable<ResponseInterface>
   */
  public getOrders() {
    return this.apiGateway.doGet('/orders/', {});
  }
}
