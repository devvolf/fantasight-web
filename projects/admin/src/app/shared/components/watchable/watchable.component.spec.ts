import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchableComponent } from './watchable.component';

describe('WatchableComponent', () => {
  let component: WatchableComponent;
  let fixture: ComponentFixture<WatchableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
