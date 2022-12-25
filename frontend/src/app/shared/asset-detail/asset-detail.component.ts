import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetDetailService } from './asset-detail.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDataDialogComponent } from '../add-data-dialog/add-data-dialog.component';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {

  type: string;
  itemId: string;

  data: any;

  displayedColumns: string[] = ['no', 'name', 'price', 'action'];
  dataSource = [];

  products: any = [];

  constructor(private route: ActivatedRoute, private service: AssetDetailService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchProducts();
  }

  fetchData() {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.type = this.route.snapshot.paramMap.get('type');
    this.service.getDetail(this.type, this.itemId).subscribe((data) => {
      this.data = data;
      console.log(`data`, this.data);
      this.dataSource = (data as any).assignedProducts.map((item, idx) => {
        return {
          ...item,
          no: idx + 1,
        }
      });
      console.log('datasource', this.dataSource);
    });
  }

  fetchProducts() {
    this.service.getProducts().subscribe((datas) => {
      this.products = datas;
      console.log(`products`, this.products);
    });
  }

  getAssetTotalPrice() {
    return this.data.assignedProducts.map((item) => item.price).reduce((partial, a) => partial + a, 0);
  }

  deleteConfirmation(item: any) {
    if (confirm('Yakin untuk delete?')) {
      return this.deleteAsset(item);
    }
  }

  deleteAsset(item: any) {
    if (this.isType('parent')) {
      return this.service.deleteItem(this.type, item.assignmentId.parents_item_id).subscribe(() => {
        console.log(`asset deleted!`);
        setTimeout(() => {
          this.fetchData();
        }, 1000);
      });
    } else {
      return this.service.deleteItem(this.type, item.assignmentId.childrens_item_id).subscribe(() => {
        console.log(`asset deleted!`);
        setTimeout(() => {
          this.fetchData();
        }, 1000);
      });
    }
  }

  addData() {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {data: {type: 'asset', products: this.products, itemId: this.itemId}, width: '30vw'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.saveItem(result.itemId, result.productIds, this.type).subscribe(() => {
          console.log(`Data saved`);
          setTimeout(() => {
            this.fetchData();
          }, 1000);
        });
      }
    });
  }

  isType(type: string) {
    return this.type === type;
  }

}