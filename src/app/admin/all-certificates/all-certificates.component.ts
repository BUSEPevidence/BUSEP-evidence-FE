import { Component, OnInit } from '@angular/core';
import { Certificate } from '../model/certificate';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css'],
  providers: [DatePipe]
})
export class AllCertificatesComponent implements OnInit {

  displayedColumns: string [] = ["serial_number", "subject_name", "issuer_name", "start_date", "end_date"]

  public selectedCertificate: Certificate = <Certificate>{};
  public dataSource = new MatTableDataSource<Certificate>();
  public certificates: Certificate[] = [
    {
      serialNumber: '123456',
      subjectName: 'John Doe',
      issuerName: 'ACME Inc.',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2028-01-01')
    },
    {
      serialNumber: '789012',
      subjectName: 'Jane Smith',
      issuerName: 'XYZ Corp.',
      startDate: new Date('2021-02-15'),
      endDate: new Date('2026-02-14')
    },
    {
      serialNumber: '345678',
      subjectName: 'Bob Johnson',
      issuerName: 'ABC Company',
      startDate: new Date('2022-03-10'),
      endDate: new Date('2029-03-09')
    }
  ];

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.certificates
  }

  public selectCert(certificate: Certificate) {
    this.selectedCertificate = certificate
    console.log(this.selectedCertificate)
  }

}
