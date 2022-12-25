import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildrensService {

  constructor(private httpClient: HttpClient) { }

  getItems(type: string) {
    return this.httpClient.get(`http://localhost:5000/items/${type}`);
  }

  saveItem(name: string, gender: string, parent_id: number) {
    const isDeleted = 0;
    const type = 'children';
    return this.httpClient.post(`http://localhost:5000/items`, {name, gender, parent_id, isDeleted, type});
  }

  deleteItem(item: any) {
    return this.updateItem(item.children_id, item.name, item.gender, item.parent_id, 1, 'children');
  }

  updateItem(itemId: string, name: string, gender: string, parent_id: number, isDeleted: number, type: string) {
    return this.httpClient.put(`http://localhost:5000/item/${itemId}`, {name, gender, parent_id, isDeleted, type});
  }
}
