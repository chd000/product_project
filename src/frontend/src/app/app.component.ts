import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public products: Product[] | undefined;
  public updateProduct: any;
  public deleteProduct: any;
  constructor(private productService: ProductService) {  }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateProduct(createFrom: NgForm): void {
    document.getElementById('create-product-form')?.click();
    this.productService.createProduct(createFrom.value).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        createFrom.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        createFrom.reset();
      }
    );
  }

  public onUpdateProduct(product: Product, productId: number): void {
    product.id = productId;
    this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProduct(productId: number, deleteForm: NgForm): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        this.getProducts();
        console.log("deleted");
        deleteForm.resetForm();
        console.log("passed");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(product: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'create') {
      button.setAttribute('data-target', '#createProductModal');
    }

    if (mode === 'update') {
      this.updateProduct = product;
      console.log(product);
      button.setAttribute('data-target', '#updateProductModal');
    }

    if (mode === 'delete') {
      this.deleteProduct = product;
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
