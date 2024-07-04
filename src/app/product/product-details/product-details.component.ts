import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private ps: ProductService,
    private router: Router

  ) { }

  id !: number;
  myProduct$!: Observable<Product>

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id'])
    this.myProduct$ = this.ps.readOne(this.id)
  }

  goBack() {
    this.router.navigate(['/products'])
  }

  deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.ps.delete(id).subscribe(data => this.router.navigate(['/products']));
    }
  }
}