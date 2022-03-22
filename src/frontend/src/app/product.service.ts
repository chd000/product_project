import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { Product } from "./product";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    var headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ': ' + password) });
    return this.http.get(`http://localhost:8080/api/v1/product/login`, { headers, responseType: 'text ' as 'json' });
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/v1/product/all');
  }

  public getProduct(product: Product): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/api/v1/product/${product.id}`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8080/api/v1/product/', product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('http://localhost:8080/api/v1/product/', product);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/v1/product/${productId}`);
  }
}
