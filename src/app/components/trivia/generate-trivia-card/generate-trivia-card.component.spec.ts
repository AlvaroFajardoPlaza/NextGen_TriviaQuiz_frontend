import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTriviaCardComponent } from './generate-trivia-card.component';

describe('GenerateTriviaCardComponent', () => {
  let component: GenerateTriviaCardComponent;
  let fixture: ComponentFixture<GenerateTriviaCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateTriviaCardComponent]
    });
    fixture = TestBed.createComponent(GenerateTriviaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
