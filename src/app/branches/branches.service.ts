import { Injectable, OnInit } from "@angular/core";
import { Branch } from "./branch.model";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/datastorage.service";

@Injectable({ providedIn: 'root' })
export class BranchService  {
  branchesChanged = new Subject<Branch[]>();

  public branches: Branch[] = [];
  constructor() { }

  
  setBranches(branches: Branch[]) {
    this.branches = branches;
    this.branchesChanged.next(this.branches.slice());
   

  }
  getBranches() {
    return this.branches.slice();
  }

  getBranch(buCode5: string) {
    return this.branches.filter(branch => branch.buCode5 == buCode5 )[0];
  }

  addBranch(Branch: Branch) {
    this.branches.push(Branch);
    this.branchesChanged.next(this.branches.slice());
    console.log(this.branches);
  }

  updateBranch(buCode5: string, newBranch: Branch) {
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




    //{ "Id": 1,  "BU_CODE5": "AB100",  "ADDRESS": "19020 111th Ave", "CITY": "EDMONTON", "STATE_NAME": "Alberta", "COUNTRY_NAME": "Canada", "CURRENCY": "CAD", "PHONE": "780-801-5006", "BUSINESS_HOURS": "Monday - Friday 7:30am - 5:00pm", "LATITUDE": 54, "LONGITUDE": -114 },
    //{ "Id": 2,  "BU_CODE5": "ABACH", "ADDRESS": "26229 Twp 531 A Unit 115", "CITY": "ACHESON", "STATE_NAME": "Alberta", "COUNTRY_NAME": "Canada", "CURRENCY": "CAD", "PHONE": "(780)-960-4120", "BUSINESS_HOURS": "Monday - Friday 7:30am - 5:00pm", "LATITUDE": 54, "LONGITUDE": -114 },
    //{ "Id": 3,  "BU_CODE5": "ABAIR",  "ADDRESS": "118 Eastlake Blvd NE Suite 101", "CITY": "AIRDRIE", "STATE_NAME": "Alberta", "COUNTRY_NAME": "Canada", "CURRENCY": "CAD", "PHONE": "(403)948-1347", "BUSINESS_HOURS": "7:30 to 5:00 moday to friday", "LATITUDE": 51, "LONGITUDE": -114 },
