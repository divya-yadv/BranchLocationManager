import { Injectable, OnInit } from "@angular/core";
import { Branch } from "./branch.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BranchService  {
  branchesChanged = new Subject<Branch[]>();

  public branches: Branch[] = [];
  setBranches(branches: Branch[]) {
    this.branches = branches;
    this.branchesChanged.next(this.branches.slice());
   

  }
  getBranches() {
    return this.branches.slice();
  }

  getBranch(buCode5: string) {
    console.log(buCode5);
    console.log(this.branches);
    //console.log(this.branches.filter(branch => branch.buCode5 == buCode5)[0]);
    return this.branches.filter(branch => branch.buCode5 == buCode5 )[0];
  }

  addBranch(Branch) {
    this.branches.push(Branch);
    this.branchesChanged.next(this.branches.slice());
  }

  updateBranch(buCode5: string, newBranch) {
    let index = this.branches.findIndex(branch => branch.buCode5 == buCode5);
    this.branches[index] = newBranch;
    this.branchesChanged.next(this.branches.slice());
  }

  deleteBranch(buCode5: string) {
    let index = this.branches.findIndex(branch => branch.buCode5 == buCode5);
    this.branches.splice(index, 1);
    this.branchesChanged.next(this.branches.slice());
  }
}
