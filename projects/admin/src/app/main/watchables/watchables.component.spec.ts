import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchablesComponent } from './watchables.component';

describe('WatchablesComponent', () => {
  let component: WatchablesComponent;
  let fixture: ComponentFixture<WatchablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
