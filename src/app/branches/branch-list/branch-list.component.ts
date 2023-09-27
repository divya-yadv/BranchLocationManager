import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Branch } from '../branch.model';
import { BranchService } from '../branches.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/datastorage.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit, OnDestroy{
  branches: Branch[];
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.branchService.branchesChanged.subscribe(
      (branches) => {
        this.branches = branches;
      }
    );
    this.datastorage.fetchBranches();
    this.branches = this.branchService.getBranches();

  }
  onNewBranch() {
    
    this.router.navigate(['/branches/new'], { relativeTo: this.route });
  }
  constructor(private branchService: BranchService, private router: Router,
    private route: ActivatedRoute, private datastorage: DataStorageService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
