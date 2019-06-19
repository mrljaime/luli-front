import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../services/orders.service';
import {OrderInterface} from '../interfaces/order-interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  /**
   * @type OrdersService
   */
  private ordersService: OrdersService;
  
  /**
   * @type OrderInterface
   */
  private orders: OrderInterface[] = [];
  
  constructor(ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  ngOnInit() {
    this.ordersService.getOrders().subscribe(
      (data)  => {
        if (typeof data.error !== 'undefined') {
          console.error(data.error);
        }
        if (typeof data.data !== 'undefined') {
          console.log(data.data);
          this.orders = data.data;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
