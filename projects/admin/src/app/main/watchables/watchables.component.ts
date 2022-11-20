import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchables',
  templateUrl: './watchables.component.html',
  styleUrls: ['./watchables.component.scss'],
})
export class WatchablesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onAdd(): void {
    this.router.navigateByUrl('/main/watchables/add');
  }
}
