import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SerieEpisodePayload } from 'projects/admin/src/app/shared/models/watchable/serie/serie.model';

@Component({
  selector: 'app-serie-episode-form',
  templateUrl: './serie-episode-form.component.html',
  styleUrls: ['./serie-episode-form.component.scss'],
})
export class SerieEpisodeFormComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    seasonIndex: new FormControl(1, [Validators.required]),
  });

  public selectedImage: File | null = null;
  public selectedImageSource: string | ArrayBuffer | null = null;
  private selectedImageReader: FileReader;

  public selectedVideo: File | null = null;
  public selectedVideoSource: string | ArrayBuffer | null = null;
  private selectedVideoReader: FileReader;

  constructor(
    public dialogRef: MatDialogRef<SerieEpisodeFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public episode: SerieEpisodePayload & {
      posterUrl: string;
      streamUrl: string;
    }
  ) {
    this.selectedImageReader = new FileReader();
    this.selectedImageReader.onload = (e) =>
      (this.selectedImageSource = this.selectedImageReader.result);

    this.selectedVideoReader = new FileReader();
    this.selectedVideoReader.onload = (e) =>
      (this.selectedVideoSource = this.selectedVideoReader.result);
  }

  ngOnInit(): void {
    if (this.episode) {
      this.form.setValue({
        title: this.episode.title,
        description: this.episode.description,
        seasonIndex: this.episode.seasonIndex,
      });

      if (this.episode.posterUrl) {
        this.selectedImageSource = this.episode.posterUrl;
      }

      if (this.episode.streamUrl) {
        this.selectedVideoSource = this.episode.streamUrl;
      }

      this.selectedImage = this.episode.posterImage;
      this.selectedVideo = this.episode.video;
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedImage = file;
      this.selectedImageReader.readAsDataURL(file);
    }
  }

  onVideoSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedVideo = file;
      this.selectedVideoReader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (
      this.form.invalid ||
      !this.selectedImageSource ||
      !this.selectedVideoSource
    ) {
      return;
    }

    const payload = {
      title: this.form.get('title')?.value!,
      description: this.form.get('description')?.value!,
      seasonIndex: this.form.get('seasonIndex')?.value!,
      posterImage: this.selectedImage,
      video: this.selectedVideo,
    } as SerieEpisodePayload;

    this.dialogRef.close(payload);
  }
}
