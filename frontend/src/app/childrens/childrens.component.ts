import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildrensService } from './childrens.service';

@Component({
  selector: 'app-childrens',
  templateUrl: './childrens.component.html',
  styleUrls: ['./childrens.component.css']
})
export class ChildrensComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'gender', 'childrenNames', 'action'];
  dataSource = [];

  constructor(private service: ChildrensService, private router: Router) { }

  ngOnInit(): void {
    this.service.getItems().subscribe((items) => {
      console.log(`items`, items);
      this.dataSource = (items as any[]).map((value, index) => {
        return {
          ...value,
          childrenNames: value.parents.map((parent) => parent.name).join(', '),
          no: index + 1,
        }
      })
    });
  }

  seeDetail(itemId: number) {
    return this.router.navigate(['/assets', 'children', itemId]);
  }

}
