import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product'
@Pipe({
  name: 'discountedPrice'
})
export class DiscountedPricePipe implements PipeTransform {

  transform(product: Product): number {
    if(!product) return null;
    if(!product.discount || product.discount == 0) return product.unit_price;

    return (product.unit_price * (100-product.discount) / 100);
  }

}
