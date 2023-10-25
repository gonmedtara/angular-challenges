import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HeavyComputation',
  standalone: true,
})
export class HeavyComputation implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
