import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-watchable',
  templateUrl: './add-watchable.component.html',
  styleUrls: ['./add-watchable.component.scss'],
})
export class AddWatchableComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    poster: new FormControl(null, [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}
}
