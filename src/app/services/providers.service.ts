import { Injectable } from '@angular/core';
import {ApiGatewayService} from './api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  
  private apiGateway: ApiGatewayService;
  
  /**
   *
   * @param apiGateway
   */
  constructor(apiGateway: ApiGatewayService) {
    this.apiGateway = apiGateway;
  }
  
  /**
   * @returns Observable<ResponseInterface>
   */
  public getProviders() {
    return this.apiGateway.doGet('/providers/', {});
  }
  
  /**
   *
   * @param id
   * @return Observable<ResponseInterface>
   */
  public getProvider(id: any) {
    return this.apiGateway.doGet('/providers/' + id, {});
  }
  
  /**
   * Use to call to update provider
   * @param id
   * @param formData
   */
  public updateProvider(id: number, formData: any) {
    return this.apiGateway.doPost('/providers/' + id, formData);
  }
  
  /**
   * Use to create new provider
   * @param formData
   */
  public createProvider(formData: any) {
    return this.apiGateway.doPost('/providers/', formData);
  }
}
