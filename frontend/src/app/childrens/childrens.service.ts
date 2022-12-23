import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildrensService {

  constructor(private httpClient: HttpClient) { }

  getItems() {
    return this.httpClient.get(`http://localhost:5000/items/children`);
  }
}
