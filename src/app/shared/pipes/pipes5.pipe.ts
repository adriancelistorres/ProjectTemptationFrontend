import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes5'
})
export class Pipes5Pipe implements PipeTransform {

  transform(values: [] | any, arg: any): [] | any {
    if (!arg || arg?.lenght < 1) return values;
    let result: [] | any = []
    for (const value of values) {
      if (value.idorder==arg) {
        result = [...result, value]
      }
    }
    return result;
  }

}
