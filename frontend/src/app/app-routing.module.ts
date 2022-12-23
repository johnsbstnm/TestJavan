import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentsComponent } from './parents/parents.component';
import { ChildrensComponent } from './childrens/childrens.component';
import { AssetDetailComponent } from './shared/asset-detail/asset-detail.component';
import { CalculationComponent } from './calculation/calculation.component';

const routes: Routes = [
  {path: 'parents', component: ParentsComponent},
  {path: 'childrens', component: ChildrensComponent},
  {path: 'assets/:type/:itemId', component: AssetDetailComponent},
  {path: 'calculation', component: CalculationComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
