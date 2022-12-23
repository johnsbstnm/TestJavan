import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private httpClient: HttpClient) {}

  getAsset(type: string) {
    return this.httpClient.get(`http://localhost:5000/asset/${type}`);
  }
}
