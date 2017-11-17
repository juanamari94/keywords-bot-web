import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsComponentComponent } from './keywords-component.component';

describe('KeywordsComponentComponent', () => {
  let component: KeywordsComponentComponent;
  let fixture: ComponentFixture<KeywordsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
