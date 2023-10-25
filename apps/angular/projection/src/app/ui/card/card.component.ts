import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      <ng-container *ngFor="let item of list">
        <ng-template
          [ngTemplateOutlet]="itemListTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      </ng-container>
    </section>

    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="addItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Output() addItem: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild('itemList', { read: TemplateRef })
  itemListTemplate!: TemplateRef<{ $implicit: any }>;
}
