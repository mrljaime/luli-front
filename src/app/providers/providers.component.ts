import { Component, OnInit } from '@angular/core';
import { ProviderInterface } from '../interfaces/provider-interface';
import { ProvidersService } from '../services/providers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  
  /**
   * Provider service that handle api gateway communication
   */
  private providersService: ProvidersService;
  
  /**
   * Providers
   */
  private providers: ProviderInterface[] = [];
  
  private router: Router;

  constructor(providersService: ProvidersService, router: Router) {
    this.providersService = providersService;
    this.router = router;
  }

  ngOnInit() {
    this.providersService.getProviders().subscribe(
      (data) => {
        if (typeof data.error !== 'undefined') {
          console.error(data.error);
        }
        
        if (typeof data.data !== 'undefined') {
          this.providers = data.data;
        }
      }
    );
  }
  
  public create() {
    this.router.navigateByUrl('/providers/new');
  }
}
