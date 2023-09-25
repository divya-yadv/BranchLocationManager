import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from "rxjs";
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
    //).pipe(
    //  map((branches) => {
    //    if (branches) {
          
    //      return new Branch({
    //        buCode5:
    //      });
    //    }
    //    throw new Error(response.errorMessage);
    //  }),
      .subscribe((branches) => {
        this.branchservice.setBranches(branches);
        console.log(branches);
      })
  }


    //this.http
    //  .get < Branch[]>(
    //    'https://localhost:7133/api/Branches'
    //  )
    //  .pipe(
    //    map(branches => {
    //      return branches

    //    }),
    //  tap(branches => {
    //    this.branchservice.setBranches(branches);

    //  }));

  storeBranches(branch:Branch) {
    // const branches = this.branchservice.getBranches();
    const branchBuCode5 = branch.buCode5 ;
   
    this.http
      .put(
        'https://localhost:7133/api/Branches/' + branchBuCode5,
        branch
      )
      .subscribe(response => {

        console.log(response);
      });
      
  }

  deleteBranch(buCode5: string) {
    // const branches = this.branchservice.getBranches();

    this.http
      .delete(
        'https://localhost:7133/api/Branches/' + buCode5
      )
      .subscribe(response => {
        console.log(response);
      });
  }
  addBranch(branch:Branch) {
    // const branches = this.branchservice.getBranches();
    console.log(branch);

    this.http
      .post(
        'https://localhost:7133/api/Branches', branch

      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
