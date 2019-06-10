import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProvidersService} from '../services/providers.service';
import {ProviderInterface} from '../interfaces/provider-interface';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-providers-edit',
  templateUrl: './providers-edit.component.html',
  styleUrls: ['./providers-edit.component.scss']
})
export class ProvidersEditComponent implements OnInit {
  
  private providerId: any = -1;
  
  /**
   * Use to fetch param
   */
  private route: ActivatedRoute;
  
  /**
   * Provider service
   */
  private providersService: ProvidersService;
  
  /**
   * Provider instance
   */
  private provider: ProviderInterface = {
    id: -1,
    name: '',
    phoneNumber: '',
    email: ''
  };
  
  /**
   * Use to notify user to posible success or error
   */
  @ViewChild('notificationSwal') private notificationSwal: SwalComponent;
  
  constructor(route: ActivatedRoute, providersService: ProvidersService) {
    this.route = route;
    this.providersService = providersService;
    this.route.params.subscribe((params) => {
      this.providerId = params.id;
    });
  }

  ngOnInit() {
    if ('new' === this.providerId) {
      return;
    }
    
    this.providersService.getProvider(this.providerId).subscribe(
      (data) => {
        if (typeof data.error !== 'undefined') {
          console.error(data.error);
        }
        
        if (typeof data.data !== 'undefined') {
          this.provider = data.data;
        }
      }
    );
  }
  
  /**
   * Submit form
   */
  public updateProvider() {
    if ('new' === this.providerId) {
      this.create();
      
      return;
    }
    
    const params = {
      name: this.provider.name,
      phoneNumber: this.provider.phoneNumber,
      uniqueId: this.provider.uniqueId,
      email: this.provider.email
    };
    
    this.providersService.updateProvider(this.provider.id, params).subscribe(
      (data) => {
        if (typeof data.error !== 'undefined') {
          console.error(data.error);
          this.notificationSwal.text = data.error;
          this.notificationSwal.type = 'error';
          this.notificationSwal.show();
        }
        
        if (typeof data.data !== 'undefined') {
          console.log(data.data);
          this.notificationSwal.text = 'Se ha actualizado con éxito el proveedor';
          this.notificationSwal.type = 'info';
          this.notificationSwal.show();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  private create() {
    const params = {
      name: this.provider.name,
      phoneNumber: this.provider.phoneNumber,
      uniqueId: this.provider.uniqueId,
      email: this.provider.email
    };
    
    this.providersService.createProvider(params).subscribe(
      (data) => {
        if (typeof data.error !== 'undefined') {
          this.notificationSwal.type = 'error';
          this.notificationSwal.text = data.error;
          this.notificationSwal.show();
        }
        
        if (typeof data.data !== 'undefined') {
          this.notificationSwal.type = 'error';
          this.notificationSwal.text = 'Se ha creado el proveedor con éxito';
          this.notificationSwal.show();
          this.providerId = data.data.id;
          this.provider.id = data.data.id;
        }
      },
      (error) => {
        this.notificationSwal.type = 'error';
        this.notificationSwal.text = 'Ha habido un error interno. Contacte a un administrador';
        this.notificationSwal.show();
      }
    );
  }

}
