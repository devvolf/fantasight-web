import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchableInfoComponent } from './watchable-info.component';

describe('WatchableInfoComponent', () => {
  let component: WatchableInfoComponent;
  let fixture: ComponentFixture<WatchableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchableInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
