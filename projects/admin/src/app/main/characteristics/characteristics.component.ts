import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  debounce,
  Observable,
  Subscription,
  tap,
  timer,
} from 'rxjs';
import { Characteristic } from '../../shared/models/characteristic/characteristic.model';
import {
  deleteCharacteristic,
  getAllCharacteristics,
} from './state/characteristics.actions';
import { CharacteristicsState } from './state/characteristics.reducers';
import { characteristics } from './state/characteristics.selectors';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss'],
})
export class CharacteristicsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  public searchText = '';
  private searchText$: BehaviorSubject<string>;
  public characteristics$: Observable<Characteristic[]>;

  private subscription: Subscription;

  constructor(
    private characteristicsStore: Store<CharacteristicsState>,
    private router: Router
  ) {
    this.subscription = new Subscription();

    this.characteristics$ = this.characteristicsStore.select(characteristics);
    this.searchText$ = new BehaviorSubject('');
  }

  ngOnInit(): void {
    this.characteristicsStore.dispatch(getAllCharacteristics({}));
    this.subscription.add(
      this.searchText$
        .pipe(
          debounce(() => timer(800)),
          tap((searchText) => {
            console.log(searchText);
            this.characteristicsStore.dispatch(
              getAllCharacteristics({ searchText })
            );
          })
        )
        .subscribe()
    );
  }

  onSearchTextChange(text: string): void {
    this.searchText$.next(text);
  }

  onAdd(): void {
    this.router.navigateByUrl('main/characteristics/add');
  }

  onEdit(id: string): void {
    this.router.navigateByUrl(`main/characteristics/${id}/edit`);
  }

  onDelete(id: string): void {
    this.characteristicsStore.dispatch(deleteCharacteristic({ id }));
  }
}
