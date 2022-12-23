import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetDetailService } from './asset-detail.service';

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

  constructor(private route: ActivatedRoute, private service: AssetDetailService) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.type = this.route.snapshot.paramMap.get('type');
    this.service.getDetail(this.type, this.itemId).subscribe((data) => {
      this.data = data;
      this.dataSource = (data as any).assignedProducts.map((item, idx) => {
        return {
          ...item,
          no: idx + 1,
        }
      });
    });
  }

  getAssetTotalPrice() {
    return this.data.assignedProducts.map((item) => item.price).reduce((partial, a) => partial + a, 0);
  }

  deleteAsset() {}

}