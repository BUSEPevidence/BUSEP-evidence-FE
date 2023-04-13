import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChildsComponent } from './all-childs.component';

describe('AllChildsComponent', () => {
  let component: AllChildsComponent;
  let fixture: ComponentFixture<AllChildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllChildsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllChildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
