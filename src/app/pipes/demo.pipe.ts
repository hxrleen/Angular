import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demo',
})
export class DemoPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const per = '%';
    return value + per;
  }
}
