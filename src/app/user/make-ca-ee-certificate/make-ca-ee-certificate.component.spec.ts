import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeCaEeCertificateComponent } from './make-ca-ee-certificate.component';

describe('MakeCaEeCertificateComponent', () => {
  let component: MakeCaEeCertificateComponent;
  let fixture: ComponentFixture<MakeCaEeCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeCaEeCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeCaEeCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
