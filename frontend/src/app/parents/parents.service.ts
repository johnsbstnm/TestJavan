import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentsService {

  constructor(private httpClient: HttpClient) { }

  getItems() {
    return this.httpClient.get(`http://localhost:5000/items/parent`);
  }

  saveItem(name: string, gender: string, type: string) {
    return this.httpClient.post(`http://localhost:5000/items`, {name, gender, type})
  }

  deleteItem(item: any) {
    return this.updateItem(item.parent_id, item.name, item.gender, 1, 'parent');
  }

  updateItem(itemId: string, name: string, gender: string, isDeleted: number, type: string) {
    return this.httpClient.put(`http://localhost:5000/item/${itemId}`, {name, gender, isDeleted, type});
  }
}
