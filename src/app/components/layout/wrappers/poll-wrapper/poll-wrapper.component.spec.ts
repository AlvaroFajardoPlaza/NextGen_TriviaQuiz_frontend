import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollWrapperComponent } from './poll-wrapper.component';

describe('PollWrapperComponent', () => {
  let component: PollWrapperComponent;
  let fixture: ComponentFixture<PollWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollWrapperComponent]
    });
    fixture = TestBed.createComponent(PollWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
