import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { LineItem } from '../models/line-item';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Array<LineItem> = [];
  eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    if(window.localStorage['cart']){
      this.cart = JSON.parse(window.localStorage.getItem('cart'));
      this.eventEmitter.emit('cart-updated');
    }
   }

  isProductInCart(id: number): boolean {
    return this.cart.findIndex(itm => itm.product.id === id) !== -1;
  }

  getQuantityForProduct(id: number): number {
    const index=this.cart.findIndex(itm => itm.product.id === id);
    if(index != -1)
    {
      return this.cart[index].quantity;
    }
    else {
      return 0;
    }
  }

  get itemCount() {
    return this.cart.length;
  
  }

  emptyCart()
  {
    this.cart = [];
    this.eventEmitter.emit('cart-updated');
  }

  get cartValue() {
    let total = 0;
    this.cart.forEach(item => {
      total += (item.product.unit_price * (100-item.product.discount)/100 * item.quantity);
    });
    return total;
  }

  addToCart(product: Product, quantity: number=1): void {
    const item = new LineItem();
    item.product = {...product };
    item.quantity = quantity;
  

    const index = this.cart.findIndex(itm => itm.product.id === product.id)
    if(index === -1) {
      this.cart.push(item);
    }
    else {
      if(quantity===0) 
      {
        this.cart.splice(index, 1);
      } 
      else 
      {
      this.cart[index] = item;
      }
    }
    console.log(this.cart);

    this.eventEmitter.emit('cart-updated');
  }

  onCartUpdated(listener: any){
    // register an event listener (subscriber function) to a given event
    this.eventEmitter.on('cart-updated', listener);

    //register another event listener for 'cart-updated' event
    this.eventEmitter.on('cart-updated', () => {
      window.localStorage.setItem('cart', JSON.stringify(this.cart));
    })
  }
}
