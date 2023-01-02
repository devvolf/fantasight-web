import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWatchableComponent } from './edit-watchable.component';

describe('AddWatchableComponent', () => {
  let component: EditWatchableComponent;
  let fixture: ComponentFixture<EditWatchableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWatchableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWatchableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
