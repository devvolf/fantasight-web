import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieEpisodeFormComponent } from './serie-episode-form.component';

describe('SerieEpisodeFormComponent', () => {
  let component: SerieEpisodeFormComponent;
  let fixture: ComponentFixture<SerieEpisodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerieEpisodeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerieEpisodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
