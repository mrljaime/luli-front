import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {OrdersService} from '../services/orders.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {ProductInterface} from '../interfaces/product-interface';
import {OrderInterface} from '../interfaces/order-interface';
import {OrderElementInterface} from '../interfaces/order-element-interface';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.scss']
})
export class OrdersEditComponent implements OnInit {
  
  /**
   * @var order
   */
  private order: OrderInterface = {
    id: -1,
    total: 0.00,
    paid: false,
    sent: false,
    createdAt: null,
    elements: 0,
    closed: false,
    interest: 0.00
  };
  
  /**
   * @var orderElements
   */
  private orderElements: OrderElementInterface[] = [];
  
  /**
   * @var route
   */
  private route: ActivatedRoute;
  
  /**
   * @var router
   */
  private router: Router;
  
  /**
   * @var orderId
   */
  private orderId: any;
  
  /**
   * @var orderService
   */
  private orderService: OrdersService;
  
  /**
   * @var productsService
   */
  private productsService: ProductsService;
  
  /**
   * @var modalService
   */
  private modalService: NgbModal;
  
  /**
   * @var errorSwal
   */
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  
  /**
   * @var products
   */
  private products: ProductInterface[] = [];
  
  /**
   * @var orderAdded
   */
  @Output() orderAdded: EventEmitter<any> = new EventEmitter();
  
  /**
   * @var totalElements
   */
  private totalElements = 0.00;
  
  /**
   * @var totalInterest
   */
  private totalInterest = 0.00;
  
  /**
   * Constructor
   * @param route
   * @param router
   * @param ordersService
   * @param productsService
   * @param modalService
   */
  constructor(
    route: ActivatedRoute,
    router: Router,
    ordersService: OrdersService,
    productsService: ProductsService,
    modalService: NgbModal
  ) {
    this.route = route;
    this.router = router;
    this.orderService = ordersService;
    this.productsService = productsService;
    this.modalService = modalService;
    this.route.params.subscribe(
      params => {
        this.orderId = params.id;
        if (this.orderId === 'new') {
          return;
        }
        
        this.getOrder(this.orderId);
    });
  }

  ngOnInit() {
    this.getProducts();
  }
  
  /**
   * Use to fetch order
   * @param id
   */
  private getOrder(id: number) {
    this.orderService.getOrder(id).subscribe(data => {
      if (typeof data.error !== 'undefined') {
        console.error(data.error);
        this.showSwal('error', data.error);
        
        return;
      }
      
      this.order = data.data;
    });
    this.orderService.getProducts(id).subscribe(data => {
      if (typeof data.error !== 'undefined') {
        console.error(data.error);
        this.showSwal('error', data.error);
        
        return;
      }
      
      this.orderElements = data.data;
      this.orderElements.forEach(orderElement => {
        this.totalElements += orderElement.qty * orderElement.price;
        this.totalInterest += orderElement.interest;
      });
    });
  }
  
  /**
   * Use to add order
   */
  private addEmptyOrder() {
    const params = {
      discount: 0
    };
    this.orderService.createOrder(params).subscribe(data => {
      if (typeof data.error !== 'undefined') {
        this.showSwal('error', data.error);
        
        return;
      }
      
      const iOrder: OrderInterface = data.data;
      this.orderAdded.emit(iOrder);
      this.router.navigateByUrl('/orders/modify/' + iOrder.id);
    });
  }
  
  /**
   * Use to call endpoint to add element to an order
   * @param product
   */
  private addOrderElement(product: ProductInterface) {
    const params = {
      products: [
        {
          id: product.id,
          qty: product.qtyRequest
        }
      ]
    };
    this.orderService.addElement(this.order.id, params).subscribe(data => {
      if (typeof data.error !== 'undefined') {
        console.error(data.error);
        this.showSwal('error', data.error);
        
        return;
      }
      
      this.getOrder(this.orderId);
      this.getProducts();
    });
  }
  
  /**
   * Use to add closed status to order
   */
  private close() {
    this.orderService.addStatus(this.order.id, 16).subscribe(data => {
      if (typeof data.error !== 'undefined') {
        this.showSwal('error', data.error);
        
        return;
      }
      
      this.getOrder(this.orderId);
      this.getProducts();
    });
  }
  
  /**
   * Open modal
   * @param content
   */
  private open(content) {
    this.modalService.open(content, {
      size: 'lg',
    });
  }
  
  /**
   * To encapsulate products
   */
  private getProducts() {
    this.productsService.getProducts().subscribe(
      (data) => {
        if (typeof data.error !== 'undefined') {
          console.error(data.error);
          this.showSwal('error', data.error);
        
          return;
        }
        this.products = data.data;
        this.products = this.products.map(product => {
          product.qtyRequest = 0;
        
          return product;
        });
      }
    );
  }
  
  /**
   * Use to show sweet alert
   * @param type
   * @param data
   */
  private showSwal(type, data) {
    this.errorSwal.type = type || 'error';
    this.errorSwal.text = data;
    this.errorSwal.show();
  }
}
