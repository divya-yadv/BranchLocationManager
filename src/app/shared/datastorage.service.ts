import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap } from "rxjs";
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
      //.subscribe(branches=>console.log(branches)
      //)
      .subscribe(branches => { this.branchservice.setBranches(branches); })


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

  }

  storeBranches(branch:any) {
    // const branches = this.branchservice.getBranches();
    const branchid = branch.id ;
   
    this.http
      .put(
        'https://localhost:7133/api/Branches/' + branchid,
        branch
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  deleteBranch(id: number) {
    // const branches = this.branchservice.getBranches();

    this.http
      .delete(
        'https://localhost:7133/api/Branches/' + id
      )
      .subscribe(response => {
        console.log(response);
      });
  }
  addBranch(Branch:any) {
    // const branches = this.branchservice.getBranches();


    this.http
      .post(
        'https://localhost:7133/api/Branches', Branch

      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
