import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
})
export class YearPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const per = ' years';
    return value + per;
  }
}
