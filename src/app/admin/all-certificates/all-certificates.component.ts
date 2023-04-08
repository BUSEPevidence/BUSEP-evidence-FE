import { Component, OnInit } from '@angular/core';
import { Certificate } from '../model/certificate';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { AdminService } from '../admin.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css'],
  providers: [DatePipe]
})
export class AllCertificatesComponent implements OnInit {

  displayedColumns: string [] = ["alias", "serial_number", "subject_name", "issuer_name", "start_date", "end_date"]

  public selectedCertificate: Certificate = <Certificate>{};
  public dataSource = new MatTableDataSource<Certificate>();
  public certificates: Certificate[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.showAllCertificates()
  }

  public selectCert(certificate: Certificate) {
    this.selectedCertificate = certificate
    console.log(this.selectedCertificate)
  }

  public showAllCertificates() {
    this.adminService.getAllCertificates().subscribe(res => {
      this.certificates = res
      this.dataSource.data = this.certificates
    })
  }

  public revokeCertificate(selectedCertificate: Certificate) {
    if(selectedCertificate.alias == "") {
      console.log("Odaberi sertifikat")
    } else {
      this.adminService.revokeCertificate(selectedCertificate.alias).subscribe(res => {
        console.log(res)
        console.log("Successfully revoked")
      })
    }
  }

  public checkValidity(selectedCertificate: Certificate) {
    if (selectedCertificate.alias == "") {
      console.log("Odaberi sertifikat")
    } else {
      this.adminService.checkValidity(selectedCertificate.alias).subscribe(res => {
        console.log(res)
        console.log("checked validity")
      })
    }
  }

}
