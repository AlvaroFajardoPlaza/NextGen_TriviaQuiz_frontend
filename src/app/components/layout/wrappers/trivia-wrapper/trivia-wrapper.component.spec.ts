import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaWrapperComponent } from './trivia-wrapper.component';

describe('TriviaWrapperComponent', () => {
  let component: TriviaWrapperComponent;
  let fixture: ComponentFixture<TriviaWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaWrapperComponent]
    });
    fixture = TestBed.createComponent(TriviaWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
