import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  customer: Customer;
  
  constructor(private cs: CartService, 
    private router: Router,
    private os: OrdersService){}

  ngOnInit() {
    
    if(!this.cs.cart.length)
    {
      this.router.navigate(['/cart-details'])
      return;
    }
    this.customer = new Customer();
  }

  checkout() {

    console.log('customer details', this.customer);

    const order = new Order();
    order.customer = { ...this.customer}; // shallow copy; dont mutate customer
    order.order_date = new Date();
    order.order_details = [...this.cs.cart]

    this.os.placeOrder(order).subscribe(ord => {
      window.alert('Order placed successfully!');
         //TODO: navigate to the order summary page
      this.cs.emptyCart();
      window.alert('Order placed with order id: ' + ord.id);
      this.router.navigate(['/']);
    }, (err) => {}, () => {})
    
  }
}
