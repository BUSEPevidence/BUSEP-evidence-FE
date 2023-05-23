import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-magic-link',
  templateUrl: './magic-link.component.html',
  styleUrls: ['./magic-link.component.css']
})
export class MagicLinkComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.magicLinkEntered();
  }

}
