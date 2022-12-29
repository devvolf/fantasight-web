import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddCharacteristic } from '../../../shared/models/characteristic/add-characteristic.model';
import { addCharacteristic } from '../state/characteristics.actions';
import { CharacteristicsState } from '../state/characteristics.reducers';

@Component({
  selector: 'app-add-characteristic',
  templateUrl: './add-characteristic.component.html',
  styleUrls: ['./add-characteristic.component.scss'],
})
export class AddCharacteristicComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });
  constructor(
    private characteristicsStore: Store<CharacteristicsState>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const payload = {
      name: this.form.get('name')?.value!,
      description: this.form.get('description')?.value,
    } as AddCharacteristic;

    this.characteristicsStore.dispatch(addCharacteristic({ payload }));
  }

  onCancel(): void {
    this.router.navigateByUrl('main/characteristics');
  }
}
