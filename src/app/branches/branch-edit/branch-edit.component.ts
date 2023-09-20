import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from '../../shared/datastorage.service';
import { BranchService } from '../branches.service';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {

  id: number;
  editMode = false;
  branchForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private branchService: BranchService, private datastorage: DataStorageService) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      
    });
  }
  onSubmit() {
    console.log(this.branchForm.value);
    if (this.editMode) {
      this.branchService.updateBranch(this.id, this.branchForm.value);
      this.datastorage.storeBranches(this.branchForm.value);
    }
    else {
      this.branchService.addBranch(this.branchForm.value);
      this.datastorage.addBranch(this.branchForm.value);
    }
   
    this.onCancel();
  }
  onCancel() {
    if (!this.editMode) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['../../../'], { relativeTo: this.route });
    }
  }
  private initForm() {
   //let id = '';
   // let status = '';
    let buCodes = '';
    //let openedAt = '';
    let address = '';
    let city = '';
    let state = '';
    let country = '';
    let currency = '';
    let phone = '';
    let businessHours = '';
    let longitude = null;
    let latitude = null;

    if (this.editMode) {
      const branch = this.branchService.getBranch(this.id);
     //  status = branch.STATUS;
      buCodes = branch.bU_CODE5;
      // openedAt = branch.OPENED_AT;
      address = branch.address;
      city = branch.city;
      state = branch.statE_NAME;
      country = branch.countrY_NAME;
      currency = branch.currency;
      phone = branch.phone;
      businessHours = branch.businesS_HOURS;
      longitude = branch.longitude;
      latitude = branch.latitude;
    }
    this.branchForm = new FormGroup({
      id: new FormControl(this.id, Validators.required),
      bu_CODE5: new FormControl(buCodes, Validators.required),
    //  status: new FormControl(status, Validators.required),
     // opened_at: new FormControl(openedAt, Validators.required),
      address: new FormControl(address, Validators.required),
      city: new FormControl(city, Validators.required),
      statE_NAME: new FormControl(state, Validators.required),
      countrY_NAME: new FormControl(country, Validators.required),
      currency: new FormControl(currency, Validators.required),
      phone: new FormControl(phone, Validators.required),
      businesS_HOURS: new FormControl(businessHours, Validators.required),
      latitude: new FormControl(latitude, Validators.required),
      longitude: new FormControl(longitude, Validators.required)
    });
  }
}
