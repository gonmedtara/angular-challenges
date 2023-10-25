import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities$ | async"
    (addItem)="(addNewItem)"
    customClass="bg-light-yellow">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template #itemList let-city>
      <app-list-item (delete)="deleteItem(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template></app-card
  >`,
  styles: [
    `
      ::ng-deep .bg-light-yellow {
        background-color: rgba(247, 189, 21, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cities$: Observable<City[]> = this.store.cities$;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
