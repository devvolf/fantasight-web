import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Watchable } from '../../models/watchable/watchable.model';

@Component({
  selector: 'app-watchable',
  templateUrl: './watchable.component.html',
  styleUrls: ['./watchable.component.scss'],
})
export class WatchableComponent implements OnInit {
  @Input() data: Watchable | undefined;
  @Output() onEdit: EventEmitter<string>;
  @Output() onDelete: EventEmitter<string>;

  constructor() {
    this.onEdit = new EventEmitter();
    this.onDelete = new EventEmitter();
  }

  ngOnInit(): void {}

  onEditFn(): void {
    this.onEdit.emit(this.data?._id);
  }

  onDeleteFn(): void {
    this.onDelete.emit(this.data?._id);
  }
}
