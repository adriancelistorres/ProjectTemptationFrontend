import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe4'
})
export class Pipe4Pipe implements PipeTransform {

  transform(values: [] | any, arg: any): Number | any {
    let result: [] | any = []
    let val: number = 0
    let num: number = 0
    if (!arg || arg?.lenght < 1) {
      for (const value of values) {
        num = value.price_sale * value.quantity
        val = val + num
      }
    }
    else {
      for (const value of values) {
        if (value.idorder == arg) {
          result = [...result, value]
        }
      }
      for (let op of result) {
        num = 0
        num = op.price_sale * op.quantity
        console.log("num :" + num)
        val = val + num
      }
    }
    return val.toFixed(2);
  }
  }
