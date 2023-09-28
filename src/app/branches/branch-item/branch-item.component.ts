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
  @Input() index: number;
  openedDtDate: string;

  constructor(private branchService: BranchService,
    private router: Router,
    private datastorage: DataStorageService
  ) {
  }
  ngOnInit() {
    this.openedDtDate = this.branch.openedDt.toString().substring(0,10);
  }

  onEditBranch() {
    this.router.navigate(['branches/', this.branch.buCode5, 'edit']);
  }

  onDeleteBranch() {
    if (confirm(`Do you want to delete branch ${this.branch.buCode5} ?`)) {
      this.datastorage.deleteBranch(this.branch.buCode5);
    }
  }
}
