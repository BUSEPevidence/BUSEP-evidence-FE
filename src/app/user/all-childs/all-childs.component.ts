import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/admin.service';
import { Certificate } from 'src/app/admin/model/certificate';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-childs',
  templateUrl: './all-childs.component.html',
  styleUrls: ['./all-childs.component.css']
})
export class AllChildsComponent {
  displayedColumns: string[] = ["alias", "serial_number", "subject_name", "issuer_name", "start_date", "end_date"]

  public selectedCertificate: Certificate = <Certificate>{};
  public dataSource = new MatTableDataSource<Certificate>();
  public certificates: Certificate[] = [];

  constructor(private userService: UserService,private adminService: AdminService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.showAllCertificates()
  }

  public selectCert(certificate: Certificate) {
    this.selectedCertificate = certificate
    console.log(this.selectedCertificate)
  }

  public showAllCertificates() {
    this.userService.getAllChildren().subscribe(res => {
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
