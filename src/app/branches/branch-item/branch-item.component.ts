import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../branches.service';
import { Branch } from '../branch.model';
import { DataStorageService } from '../../shared/datastorage.service';

@Component({
  selector: '[app-branch-item]',
  templateUrl: './branch-item.component.html',
  styleUrls: ['./branch-item.component.css']
})
export class BranchItemComponent implements OnInit {

  @Input() branch: Branch;
  @Input() index: number ;
  constructor(private branchService: BranchService,
    private router: Router, private datastorage: DataStorageService) {
  }
  ngOnInit() {
    this.branch = this.branchService.getBranch(this.branch.id);
  }
  onEditBranch() {
    this.router.navigate(['branches/', this.branch.id, 'edit']);
  }

  onDeleteBranch() {
    this.branchService.deleteBranch(this.branch.id);
    this.datastorage.deleteBranch(this.branch.id);
    this.router.navigate(['/']);
  }
}
