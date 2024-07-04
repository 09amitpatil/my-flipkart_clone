import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReviewComponent } from './review/review.component';
import { SpecificationComponent } from './specification/specification.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "add", component: AddProductComponent },
  {
    path: ":id", component: ProductDetailsComponent,
    children: [
      { path: "reviews", component: ReviewComponent },
      { path: "specifiacations", component: SpecificationComponent }
    ]
  },
  { path: ':id/edit', component: UpdateProductComponent }
]

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ReviewComponent,
    SpecificationComponent,
    AddProductComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductModule { }
