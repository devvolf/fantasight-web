import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private streamUrl: string
  ) {}

  get url(): string {
    return this.streamUrl;
  }

  ngOnInit(): void {}
}
