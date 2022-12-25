import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrls: ['./add-data-dialog.component.css']
})
export class AddDataDialogComponent implements OnInit {

  type: string;

  name: string = '';
  gender: string = 'Male';
  parent_id: number;
  product_id: number;
  itemId: number;
  parenst: any[];
  products: any[];

  constructor(public dialogRef: MatDialogRef<AddDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.type = data.type;
      this.parenst = data.parents;
      if (this.isType('parent')) {
        if (this.data.existingData) {
          this.name = this.data.existingData.name;
          this.gender = this.data.existingData.gender;
        }
      }
      if (this.isType('children')) {
        if (this.data.existingData) {
          this.name = this.data.existingData.name;
          this.gender = this.data.existingData.gender;
          this.parent_id = this.data.existingData.parent_id;
        }
      }
      if (this.isType('asset')) {
        this.product_id = 1;
        this.itemId = this.data.itemId;
        this.products = data.products.products;
      }
    }

  ngOnInit(): void {
  }

  getTitle() {
    if (this.type === 'parent') {
      return 'Tambah data orang tua';
    } else {
      return 'Tambah data anak';
    }
  }

  genderSelectionChanged($event) {
    this.gender = $event.target.defaultValue;
  }

  save() {
    if (this.isType('parent')) {
      return this.dialogRef.close({name: this.name, gender: this.gender, type: this.type});
    } else if (this.isType('children')) {
      return this.dialogRef.close({name: this.name, gender: this.gender, parent_id: this.parent_id, type: this.type});
    } else if (this.isType('asset')) {
      return this.dialogRef.close({itemId: this.itemId, productIds: [this.product_id], type: this.type});
    }
  }

  close() {
    return this.dialogRef.close(null);
  }

  isType(type: string) {
    return this.type === type;
  }

}

interface DialogData {
  type: string;
  parents?: any[];
  products?: any;
  existingData?: any;
  itemId?: number;
}
