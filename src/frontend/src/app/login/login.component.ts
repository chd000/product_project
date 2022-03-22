import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  message: any;

  constructor(private service: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  doLogin() {
    var response = this.service.login(this.username, this.password);
    response.subscribe(data => {
      this.message = data;
      console.log(data);
      this.router.navigate(["/"])
    })
  }

}
