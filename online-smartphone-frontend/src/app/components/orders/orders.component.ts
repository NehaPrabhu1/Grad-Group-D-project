import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  orderitems: any[] = [];
  user: any = {};
  iscollapsed: boolean = true;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    if (this.user) {
      this.orderService.getOrderByUser(this.user.id).subscribe((res) => {
        this.orders = res;
        console.log(res);
        for (let order of this.orders) {
          this.orderitems = order.orderitems;
          let i = 0;
          for (let orderitem of this.orderitems) {
            this.productService
              .getProductById(orderitem.productid)
              .subscribe((data) => {
                order.orderitems[i].product = data;
                i++;
              });
          }
        }
        console.log(this.orders);
      });
    }
  }

  showDetails() {
    this.iscollapsed = !this.iscollapsed;
  }
}
