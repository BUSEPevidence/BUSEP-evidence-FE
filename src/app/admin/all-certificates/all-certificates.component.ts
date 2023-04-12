import { Component, OnInit } from '@angular/core';
import { Certificate } from '../model/certificate';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { AdminService } from '../admin.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { downDTO } from '../model/downDTO';



@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css'],
  providers: [DatePipe]
})
export class AllCertificatesComponent implements OnInit {

  displayedColumns: string[] = ["alias", "serial_number", "subject_name", "issuer_name", "start_date", "end_date","download"]

 
  public selectedCertificate: Certificate = <Certificate>{};
  public dataSource = new MatTableDataSource<Certificate>();
  public certificates: Certificate[] = [];
  directoryPath? : string

  constructor(private adminService: AdminService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.showAllCertificates()
  }

  public selectCert(certificate: Certificate) {
    this.selectedCertificate = certificate
    console.log(this.selectedCertificate)
  }
 

  public  downloadFile() {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/path/to/file'; // Replace with the actual file URL
    downloadLink.download = 'filename.ext'; // Replace with the suggested filename
    downloadLink.click();
  }
 
  public chooseDirectory() {
    if ('showDirectoryPicker' in window) {
      // Check if the showDirectoryPicker API is supported in the browser
      const showDirectoryPicker = window.showDirectoryPicker as () => Promise<any>;
      showDirectoryPicker()
        .then((directoryHandle) => {
          // Handle the selected directory here
          console.log(directoryHandle);
          this.directoryPath = directoryHandle?.kind === 'directory' ? directoryHandle.name : null;
          console.log('Directory Path:', this.directoryPath);

        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    } else {
      // Show a fallback message if the API is not supported
      alert('The Directory Upload API is not supported in your browser.');
    }
  }
  public downl()
  {
    const certForDownload: downDTO = {
      alias: ""+this.selectedCertificate.alias,
      path:""
    }
    this.adminService.downloadCertificate(certForDownload).subscribe((res: any) => {
      this.toast.success("Certificate is downloaded in downloaded-certificates folder");
    })
  }

  public showAllCertificates() {
    this.adminService.getAllCertificates().subscribe(res => {
      this.certificates = res
      this.dataSource.data = this.certificates
    })
  }

  public revokeCertificate(selectedCertificate: Certificate) {
    if (selectedCertificate.alias == undefined) {
      this.toast.error('Please select a certificate.')
    } else {
      this.adminService.revokeCertificate(selectedCertificate.alias).subscribe((res: any) => {
        this.toast.success(res);
      })
    }
  }

  public checkValidity(selectedCertificate: Certificate) {
    if (selectedCertificate.alias == undefined) {
      this.toast.error('Please select a certificate.')
    } else {
      this.adminService.checkValidity(selectedCertificate.alias).subscribe((res: any) => {
        this.toast.info(res);
      })
    }
  }

  public goToMakeRoot() {
    this.router.navigate(['/admin/make-root'])
  }

  public goToMakeCert() {
    this.router.navigate(['/admin/make-cert'])
  }
}
