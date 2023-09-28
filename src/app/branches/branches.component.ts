import { Component, OnInit } from '@angular/core';
import { Branch } from './branch.model';
import { BranchService } from './branches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.isLoggedIn = !!this.authService.user;
  }

}
