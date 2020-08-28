import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLevainComponent } from './card-levain.component';

describe('CardLevainComponent', () => {
  let component: CardLevainComponent;
  let fixture: ComponentFixture<CardLevainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardLevainComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLevainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
