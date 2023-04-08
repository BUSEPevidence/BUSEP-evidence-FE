/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakeCertificateComponent } from './make-certificate.component';

describe('MakeSertificateComponent', () => {
  let component: MakeCertificateComponent;
  let fixture: ComponentFixture<MakeCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
