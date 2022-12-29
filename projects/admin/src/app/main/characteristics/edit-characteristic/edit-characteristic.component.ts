import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import { EditCharacteristic } from '../../../shared/models/characteristic/edit-characteristic.model';
import { editCharacteristic } from '../state/characteristics.actions';
import { CharacteristicsState } from '../state/characteristics.reducers';
import { characteristic } from '../state/characteristics.selectors';

@Component({
  selector: 'app-edit-characteristic',
  templateUrl: './edit-characteristic.component.html',
  styleUrls: ['./edit-characteristic.component.scss'],
})
export class EditCharacteristicComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });

  private id = '';

  public characteristic$: Observable<Characteristic | undefined>;

  private subscription: Subscription;

  constructor(
    private characteristicsStore: Store<CharacteristicsState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscription = new Subscription();
    this.characteristic$ = this.route.params.pipe(
      map((params: Params) => params['id']),
      tap((id) => (this.id = id)),
      switchMap((id: string) =>
        this.characteristicsStore.select(characteristic(id))
      ),
      tap((characteristic: Characteristic | undefined) => {
        characteristic
          ? this.form.setValue({
              name: characteristic.name,
              description: characteristic.description
                ? characteristic.description
                : '',
            })
          : null;
      })
    );
  }

  ngOnInit(): void {
    this.subscription.add(this.characteristic$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const payload = {
      id: this.id,
      name: this.form.get('name')?.value!,
      description: this.form.get('description')?.value,
    } as EditCharacteristic;

    this.characteristicsStore.dispatch(editCharacteristic({ payload }));
  }

  onCancel(): void {
    this.router.navigateByUrl('main/characteristics');
  }
}
