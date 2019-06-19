import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import { ProductsService } from '../services/products.service';
import { ResponseInterface } from '../interfaces/response-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  public tableColumns = [
    { prop: 'id', name: 'Id' },
    { prop: 'name', name: 'Nombre' },
    { prop: 'description', name: 'Descripción' }
  ];
  
  /**
   * @type ProductInterface[]
   */
  private products: ProductInterface[] = [];
  
  /**
   * @type ProductsService
   */
  private productsService: ProductsService;
  
  /**
   * @type Router
   */
  private router: Router;

  constructor(productsService: ProductsService, router: Router) {
    this.productsService = productsService;
    this.router = router;
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(
      (data: ResponseInterface) => {
        if (typeof data.data !== 'undefined') {
          this.products = data.data;
        }
        
        if (typeof data.error !== 'undefined') {
          const error = data.error;
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  public newProduct() {
    this.router.navigateByUrl('/products/new');
  }

}
