import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../services/orders.service';
import {OrderInterface} from '../interfaces/order-interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  private router: Router;
  
  /**
   * @type OrdersService
   */
  private ordersService: OrdersService;
  
  /**
   * @type OrderInterface
   */
  private orders: OrderInterface[] = [];
  
  constructor(router: Router, ordersService: OrdersService) {
    this.router = router;
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

  newOrder() {
    this.router.navigateByUrl('/orders/modify/new');
  }
  
}
