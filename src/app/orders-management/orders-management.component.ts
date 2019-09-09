import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '../services/orders.service';
import {OrderInterface} from '../interfaces/order-interface';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.scss']
})
export class OrdersManagementComponent implements OnInit {
  
  /**
   * @var route
   */
  private route: ActivatedRoute;
  
  /**
   * @var router
   */
  private router: Router;
  
  /**
   * @var orderService
   */
  private orderService: OrdersService;
  
  private sessionOrders: OrderInterface[] = [];
  
  /**
   * Constructor
   * @param route
   * @param router
   * @param ordersService
   */
  constructor(route: ActivatedRoute, router: Router, ordersService: OrdersService) {
    this.route = route;
    this.router = router;
    this.orderService = ordersService;
  }
  
  ngOnInit() {
    this.getSessionOrders();
  }
  
  /**
   * Use to fetch session saved orders on local storage
   */
  private getSessionOrders() {
    if (null != localStorage.getItem('sessionOrders')) {
      this.sessionOrders = JSON.parse(localStorage.getItem('sessionOrders'));
    }
  }
  
  private addToLocalSessions(data: any) {
    let sessionOrders = [];
    if (null != localStorage.getItem('sessionOrders')) {
      sessionOrders = JSON.parse(localStorage.getItem('sessionOrders'));
    }
  
    if (sessionOrders.length === 3) {
      sessionOrders.shift();
    }
    sessionOrders.push(data);
    this.sessionOrders = sessionOrders;
    localStorage.setItem('sessionOrders', JSON.stringify(this.sessionOrders));
  }

  private go(id: number) {
    this.router.navigateByUrl('/orders/modify/' + id);
  }
  
  private onActivate(componentReference) {
    console.log(componentReference);
    componentReference.orderAdded.subscribe(data => {
      console.log(data);
      this.addToLocalSessions(data);
    });
  }
}
