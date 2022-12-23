import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDataDialogComponent } from '../shared/add-data-dialog/add-data-dialog.component';
import { ParentsService } from './parents.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'gender', 'childrenNames', 'action'];
  dataSource = [];

  constructor(private service: ParentsService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getItems().subscribe((items) => {
      console.log(`items`, items);
      this.dataSource = (items as any[]).map((value, index) => {
        return {
          ...value,
          childrenNames: value.childrens.map((children) => children.name).join(', '),
          no: index + 1,
        }
      })
    });
  }

  seeDetail(itemId: number) {
    return this.router.navigate(['/assets', 'parent', itemId]);
  }

  addData() {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {data: {type: 'parent'}, width: '30vw'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.saveItem(result.name, result.gender, result.type).subscribe(() => {
          console.log(`Data saved`);
          setTimeout(() => {
            this.fetchData();
          }, 3000);
        });
      }
    });
  }

  deleteConfirmation(itemId: number) {
    if (confirm('Yakin untuk delete?')) {
      return this.doDelete(itemId);
    }
  }

  doDelete(itemId) {
    this.service.deleteItem(itemId).subscribe(() => {
      console.log(`Data deleted`);
      setTimeout(() => {
        this.fetchData();
      }, 3000);
    });
  }

  edit(item: any) {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {data: {type: 'parent', existingData: item}, width: '30vw'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.updateItem(item.parent_id, result.name, result.gender, result.type).subscribe(() => {
          console.log(`Data saved`);
          setTimeout(() => {
            this.fetchData();
          }, 3000);
        });
      }
    });
  }

}

export interface PeriodicElement {
  no: number,
  name: string;
  gender: string;
}
