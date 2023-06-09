import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cartProduct: any = [];
  singleProduct: any;
  minQuantity: number = 1;
  maxQuantity: number = 5;
  public updatedCartProduct: any;
  user: any = {};
  isloggedin: boolean = false;
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.total = 0;
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    if (this.user) {
      this.isloggedin = true;
    } else {
      this.isloggedin = false;
    }

    this.cartService.getCartProducts().subscribe((product) => {
      this.cartProduct = product;
      if (this.cartProduct.length >= 1)
        this.singleProduct = this.cartProduct[0];
      console.log(this.cartProduct);
      for (let p of this.cartProduct) {
        this.total += p.price * p.quantity;
      }
    });
  }

  deleteFromCart(id: number) {
    if (confirm('Do you want to remove this product ?'))
      this.cartService.deleteProductFromCart(id).subscribe((response) => {
        console.log('Data Deleted - ', response);
        alert('Product Deleted Succesfully');
        //this.ngOnInit();
        window.location.reload();
      });
  }

  increaseQuantity(cartProduct: any) {
    if (cartProduct.quantity < this.maxQuantity) {
      cartProduct.quantity++;
      this.updatedCartProduct = cartProduct;
      this.cartService
        .updateCartProduct(this.updatedCartProduct, cartProduct.id)
        .subscribe((res) => console.log(cartProduct));
    }
    this.ngOnInit();
  }

  decreaseQuantity(cartProduct: any) {
    console.log(cartProduct);
    if (cartProduct.quantity > this.minQuantity) {
      cartProduct.quantity--;
      this.updatedCartProduct = cartProduct;
      this.cartService
        .updateCartProduct(this.updatedCartProduct, cartProduct.id)
        .subscribe((res) => console.log(cartProduct));
    }
    this.ngOnInit();
  }

  placeOrder() {
    if (this.isloggedin) {
      this.router.navigate(['checkout']);
    } else {
      alert('You need to login first!!');
      this.router.navigate(['/login']);
    }
  }
}
