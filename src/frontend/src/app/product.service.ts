import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { Product } from "./product";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/v1/product/all');
  }

  public getProduct(product: Product): Observable<Product> {
    return this.http.get<Product>('${apiServerUrl}/api/v1/product/${product.id}');
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('${apiServerUrl}/api/v1/product/create', product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('${apiServerUrl}/api/v1/product/update', product);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>('${apiServerUrl}/api/v1/product/delete/${productId}');
  }
}
