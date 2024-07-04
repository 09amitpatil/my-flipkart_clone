import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { forbiddenValidator } from '../forbidden-validators';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private ps: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  updateForm!: FormGroup;
  id!: number;
  product$!: Observable<Product>;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.product$ = this.ps.readOne(this.id);
      this.product$.subscribe(product => {
        this.updateForm.patchValue(product);
      });
    });

    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), forbiddenValidator('yahoo')]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(500000)]],
      discount: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      description: [''],
      imageUrl: ['']
    });
  }

  get f() {
    return this.updateForm.controls;
  }

  updateProduct() {
    if (this.updateForm.valid) {
      this.ps.update(this.id, this.updateForm.value).subscribe(
        data => {
          alert('Product updated successfully');
          this.router.navigate(['/products']);
        });
    } else {
      alert('Please fill out the form correctly');
    }
  }
}
