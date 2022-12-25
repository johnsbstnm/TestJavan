import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildrensService } from './childrens.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDataDialogComponent } from '../shared/add-data-dialog/add-data-dialog.component';

@Component({
  selector: 'app-childrens',
  templateUrl: './childrens.component.html',
  styleUrls: ['./childrens.component.css']
})
export class ChildrensComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'gender', 'childrenNames', 'action'];
  dataSource = [];
  parenst: any = [];

  constructor(private service: ChildrensService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchData('children');
    this.fetchData('parent');
  }

  fetchData(type: string) {
    this.service.getItems(type).subscribe((items) => {
      console.log(`items`, items);
      if (type === 'children') {
        this.dataSource = (items as any[]).map((value, index) => {
          return {
            ...value,
            childrenNames: value.parents.map((parent) => parent.name).join(', '),
            no: index + 1,
          }
        });
      } else {
        this.parenst = items;
      }
    });
  }

  addData() {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {data: {type: 'children', parents: this.parenst}, width: '30vw'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.saveItem(result.name, result.gender, result.parent_id).subscribe(() => {
          console.log(`Data saved`);
          setTimeout(() => {
            this.fetchData('children');
          }, 3000);
        });
      }
    });
  }
  
  edit(item) {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {data: {type: 'children', existingData: item, parents: this.parenst}, width: '30vw'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.updateItem(item.children_id, result.name, result.gender, result.parent_id, 0, result.type).subscribe(() => {
          console.log(`Data saved`);
          setTimeout(() => {
            this.fetchData('children');
          }, 1000);
        });
      }
    });
  }

  deleteConfirmation(item) {
    if (confirm('Yakin untuk delete?')) {
      return this.doDelete(item);
    }
  }

  doDelete(item: any) {
    this.service.deleteItem(item).subscribe(() => {
      console.log(`Data deleted`);
      setTimeout(() => {
        this.fetchData('children');
      }, 1000);
    });
  }

  seeDetail(itemId: number) {
    return this.router.navigate(['/assets', 'children', itemId]);
  }

}
