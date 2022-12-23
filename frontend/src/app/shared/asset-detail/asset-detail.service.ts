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
}
