import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBreadComponent } from './card-bread.component';

describe('CardBreadComponent', () => {
  let component: CardBreadComponent;
  let fixture: ComponentFixture<CardBreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardBreadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
