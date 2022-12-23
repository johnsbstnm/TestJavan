import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ParentsComponent } from './parents/parents.component';
import { ChildrensComponent } from './childrens/childrens.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { AssetDetailComponent } from './shared/asset-detail/asset-detail.component';
import { AddDataDialogComponent } from './shared/add-data-dialog/add-data-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CalculationComponent } from './calculation/calculation.component';


@NgModule({
  declarations: [
    AppComponent,
    ParentsComponent,
    ChildrensComponent,
    AssetDetailComponent,
    AddDataDialogComponent,
    CalculationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
  ],
  entryComponents: [
    AddDataDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
