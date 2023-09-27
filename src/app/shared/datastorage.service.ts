import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BranchService } from "../branches/branches.service";
import { Branch } from "../branches/branch.model";



@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private branchservice: BranchService) { }
  fetchBranches() {
    this.http
      .get<Branch[]>(
        'https://localhost:7133/api/Branches'
      )
      .subscribe((branches) => {
        this.branchservice.setBranches(branches);
      })
  }
  storeBranches(branch: Branch) {
    const branchBuCode5 = branch.buCode5;
    this.http
      .put(
        'https://localhost:7133/api/Branches/' + branchBuCode5,
        branch
      )
      .subscribe(branch => {
        this.branchservice.updateBranch(branchBuCode5, branch);
        alert(`Your branch ${branchBuCode5} is updated!`);
      }
      );
  }


  deleteBranch  (buCode5: string){
    this.http
      .delete(
        'https://localhost:7133/api/Branches/' + buCode5
    )
      .subscribe(response => {
        this.branchservice.deleteBranch(buCode5);
        alert(`Your branch ${buCode5} is deleted!`)
      });
  }
  addBranch(branch: Branch) {
    this.http
      .post(
        'https://localhost:7133/api/Branches', branch
      )
      .subscribe(response => {
        this.branchservice.addBranch(response);
        alert(`New branch ${branch.buCode5} is created!`);
      });
  }
}
