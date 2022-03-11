import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public products: Product[] | undefined;
  constructor(private productService: ProductService) { }

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

  public onOpenModal(product: Product, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'create') {
      button.setAttribute('data-target', '#createProductModal');
    }

    if (mode === 'update') {
      button.setAttribute('data-target', '#updateProductModal');
    }

    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
