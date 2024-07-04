import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Flipkart' },
  { path: 'aboutUs', component: AboutUsComponent, title: 'Flipkart | About Us' },
  { path: 'products',
    loadChildren: () => import('./product/product.module')
                              .then(m => m.ProductModule)},
  { path: '**', component: PageNotFoundComponent, title: '404 | page not found' }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
