import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWatchableComponent } from './add-watchable.component';

describe('AddWatchableComponent', () => {
  let component: AddWatchableComponent;
  let fixture: ComponentFixture<AddWatchableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWatchableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWatchableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
