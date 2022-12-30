import { Component, Input, OnInit } from '@angular/core';
import { Watchable } from '../../models/watchable/watchable.model';

@Component({
  selector: 'app-watchable',
  templateUrl: './watchable.component.html',
  styleUrls: ['./watchable.component.scss'],
})
export class WatchableComponent implements OnInit {
  @Input() data: Watchable | undefined;

  constructor() {}

  ngOnInit(): void {}
}
