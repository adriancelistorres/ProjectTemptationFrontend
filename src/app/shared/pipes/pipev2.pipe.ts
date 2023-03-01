import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipev2'
})
export class Pipev2Pipe implements PipeTransform {
  transform(values: [] | any, arg: any): [] | any {
    if (!arg || arg?.lenght < 1) return values;
    let result: [] | any = []
    for (const value of values) {
      if (value.idclaims==arg) {
        result = [...result, value]
      }
    }
    return result;
  }
}
