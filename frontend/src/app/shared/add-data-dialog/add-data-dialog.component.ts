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

  constructor(public dialogRef: MatDialogRef<AddDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.type = data.type;
      if (this.type === 'parent') {
        if (this.data.existingData) {
          this.name = this.data.existingData.name;
          this.gender = this.data.existingData.gender;
        }
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
    if (this.type === 'parent') {
      return this.dialogRef.close({name: this.name, gender: this.gender, type: this.type});
    }
  }

  close() {
    return this.dialogRef.close(null);
  }

}

interface DialogData {
  type: string;
  existingData?: any;
}
