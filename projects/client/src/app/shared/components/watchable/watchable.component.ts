import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Watchable } from '../../models/watchable.model';
// import { Watchable } from '../../models/watchable/watchable.model';

@Component({
  selector: 'app-watchable',
  templateUrl: './watchable.component.html',
  styleUrls: ['./watchable.component.scss'],
})
export class WatchableComponent implements OnInit {
  @Input() data: Watchable | undefined;
  @Output() onSelected: EventEmitter<Watchable> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickFn(): void {
    if (this.data) {
      this.onSelected.emit(this.data);
    }
  }
}
