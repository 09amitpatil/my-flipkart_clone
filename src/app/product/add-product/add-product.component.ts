import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { forbiddenValidator } from '../forbidden-validators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm !: FormGroup;

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4), forbiddenValidator('yahoo')]),
      price: new FormControl('', [Validators.required, Validators.min(1), Validators.max(500000)]),
      discount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
      description: new FormControl(''),
      imageUrl: new FormControl('/assets/images/lifelong4.jpeg')
    });
  }

  get f() {
    return this.addForm.controls;
  }

  constructor(private ps: ProductService,
    private router: Router
  ) { }

  addProduct() {
    this.ps.insert(this.addForm.value).subscribe(data => {
      alert("New Product added");
      this.router.navigate(['/products']);
    });
  }
}
