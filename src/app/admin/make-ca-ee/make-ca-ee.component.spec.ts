/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakeCaEeComponent } from './make-ca-ee.component';

describe('MakeCaEeComponent', () => {
  let component: MakeCaEeComponent;
  let fixture: ComponentFixture<MakeCaEeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeCaEeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCaEeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
