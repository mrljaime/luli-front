import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {ResponseInterface} from '../interfaces/response-interface';
import {ProductInterface} from '../interfaces/product-interface';
import {ProvidersService} from '../services/providers.service';
import {ProviderInterface} from '../interfaces/provider-interface';
import {CategoriesService} from '../services/categories.service';
import {CategoryInterface} from '../interfaces/category-interface';
import {SubCategoryInterface} from '../interfaces/sub-category-interface';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit {
  
  private productsService: ProductsService;
  private providersService: ProvidersService;
  private categoriesService: CategoriesService;
  private productId: any;
  private product: ProductInterface = {
    provider: {
      id: -1
    },
    category: {
      id: -1,
      name: ''
    },
    subCategory: {
      id: -1
    }
  };
  private providers: ProviderInterface[] = [];
  private categories: CategoryInterface[] = [];
  private subCategories: SubCategoryInterface[] = [];
  private _subCategories: SubCategoryInterface[] = [];
  
  private iProvider = -1;
  private iCategory = -1;
  private iSubcategory = -1;
  
  // Swal component
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  
  constructor(
    route: ActivatedRoute,
    productsService: ProductsService,
    providersService: ProvidersService,
    categoriesService: CategoriesService
  ) {
    this.productsService = productsService;
    this.providersService = providersService;
    this.categoriesService = categoriesService;
    route.params.subscribe(
      (params) => {
        this.productId = params.id;
      }
    );
  }

  ngOnInit() {
    // Fetch providers
    this.providersService.getProviders().subscribe(
      (data: ResponseInterface) => {
        if (typeof data.data !== 'undefined') {
          console.log(data.data);
          this.providers = data.data;
        }
        if (typeof data.error !== 'undefined') {
          console.error(data.error);
          this.errorSwal.type = 'error';
          this.errorSwal.text = data.error;
          this.errorSwal.show();
        }
      },
      (error) => {
        console.log(error);
      }
    );
    
    // Fetch categories
    this.categoriesService.getCategories().subscribe(
      (data: ResponseInterface) => {
        if (typeof data.data !== 'undefined') {
          this.categories = data.data;
        }
        
        if (typeof  data.error !== 'undefined') {
          console.error(data.error);
          this.errorSwal.type = 'error';
          this.errorSwal.text = data.error;
          this.errorSwal.show();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  
    // Fetch subcategories
    this.categoriesService.getSubCategories().subscribe(
      (data: ResponseInterface) => {
        if (typeof data.data !== 'undefined') {
          this._subCategories = data.data;
        }
      
        if (typeof data.error !== 'undefined') {
          console.error(data.error);
          this.errorSwal.type = 'error';
          this.errorSwal.text = data.error;
          this.errorSwal.show();
        }
      },
      (error) => {
        console.error(error);
        this.errorSwal.type = 'error';
        this.errorSwal.text = 'Hubo un error interno. Contacte a un administrador';
        this.errorSwal.show();
      }
    );
  
    // Fetch because isn't new
    if ('new' !== this.productId) {
      this.productsService.getProduct(this.productId).subscribe(
        (data: ResponseInterface) => {
          if (typeof data.error !== 'undefined') {
            console.error(data.error);
            this.errorSwal.type = 'error';
            this.errorSwal.text = data.error;
            this.errorSwal.show();
          }
          
          if (typeof data.data !== 'undefined') {
            this.product = data.data;
            this.iProvider = this.product.provider.id;
            this.iCategory = this.product.category.id;
            this.iSubcategory = this.product.subCategory.id;
            this.getSubCategoriesByParent(this.product.category.id);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  public updateProduct() {
    if ('new' === this.productId) {
      this.createProduct();
      
      return;
    }
    
    const params = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      qty: this.product.qty,
      provider: this.product.provider.id,
      category: this.product.category.id,
      subCategory: this.product.subCategory.id,
      active: this.product.active,
      interest: this.product.interest
    };
    
    this.productsService.updateProduct(this.product.id, params).subscribe(
      (data) => {
        console.log(data);
        if (typeof data.error === 'undefined') {
          this.errorSwal.type = 'error';
          this.errorSwal.text = data.error;
          this.errorSwal.show();
        }
        
        if (typeof data.data !== 'undefined') {
          this.errorSwal.type = 'info';
          this.errorSwal.text = 'Se ha actualizado el producto con éxito';
          this.errorSwal.show();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  /**
   * Use to create product
   */
  private createProduct() {
    const params = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      qty: this.product.qty,
      provider: this.product.provider.id,
      category: this.product.category.id,
      subCategory: this.product.subCategory.id,
      active: this.product.active,
    };
    
    this.productsService.create(
      params.provider,
      params.category,
      params.subCategory,
      params.name,
      params.description,
      params.price,
      params.qty,
      params.active
    ).subscribe(
      (data) => {
        if (typeof data.error !== 'undefined') {
          console.error(data.error);
          this.errorSwal.type = 'error';
          this.errorSwal.text = data.error;
          this.errorSwal.show();
        }
        
        if (typeof data.data !== 'undefined') {
          console.log(data.data);
          this.product.id = data.data.id;
          this.productId = data.data.id;
          this.errorSwal.type = 'info';
          this.errorSwal.text = 'Se ha creado el producto con éxito';
          this.errorSwal.show();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  /**
   * Set provider to product object
   */
  public setProvider() {
    this.providers.forEach((provider) => {
      if (provider.id === this.iProvider) {
        this.product.provider = provider;
        
        return;
      }
    });
  }
  
  /**
   * Use to set category
   */
  public setCategory() {
    this.categories.forEach((category) => {
      if (category.id === this.iCategory) {
        this.product.category = category;
        this.getSubCategoriesByParent(this.iCategory);
        console.log(this.product);
        
        return;
      }
    });
  }
  
  /**
   * Use to set subcategory
   */
  public setSubcategory() {
    this.subCategories.forEach((subcategory) => {
      if (subcategory.id === this.iSubcategory) {
        this.product.subCategory = subcategory;
        console.log(this.product.subCategory);
        
        return;
      }
    });
  }
  
  /**
   *
   * @param categoryId
   */
  private getSubCategoriesByParent(categoryId) {
    console.log(categoryId);
    console.log(this._subCategories);
    this.subCategories = this._subCategories.filter(
      (subCategory: SubCategoryInterface) => {
        console.log(subCategory);
        
        return subCategory.category.id === categoryId;
      }
    );
    console.log(this.subCategories);
  }

}
