import { Component } from '@angular/core';
import { Branch } from './branch.model';
import { BranchService } from './branches.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {
}
