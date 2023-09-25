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
    
    //console.log(this.branch.buCode5);
    //console.log(this.index);
    //console.log(this.branch);
  }
  onEditBranch() {
    console.log(this.branch.buCode5);
    this.router.navigate(['branches/', this.branch.buCode5, 'edit']);
  }

  onDeleteBranch() {
    this.branchService.deleteBranch(this.branch.buCode5);
    this.datastorage.deleteBranch(this.branch.buCode5);
    this.router.navigate(['/']);
  }
}
