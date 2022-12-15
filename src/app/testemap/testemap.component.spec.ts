import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestemapComponent } from './testemap.component';

describe('TestemapComponent', () => {
  let component: TestemapComponent;
  let fixture: ComponentFixture<TestemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
