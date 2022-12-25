import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetDetailService {

  constructor(private httpClient: HttpClient) { }

  getDetail(type: string, itemId: string) {
    return this.httpClient.get(`http://localhost:5000/item/${type}/${itemId}`);
  }

  getProducts() {
    return this.httpClient.get(`http://localhost:5000/products`);
  }

  saveItem(itemId: string, productIds: number[], type: string) {
    return this.httpClient.post(`http://localhost:5000/asset`, {itemId, productIds, type});
  }

  deleteItem(type: string, assignmentId: number) {
    return this.httpClient.put(`http://localhost:5000/asset`, {type, assignmentId});
  }
}
