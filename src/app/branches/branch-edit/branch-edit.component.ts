import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from '../../shared/datastorage.service';
import { BranchService } from '../branches.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {

  buCode5: string;
  editMode = false;
  branchForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private branchService: BranchService, private datastorage: DataStorageService) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.buCode5 = params['buCode5'];
      this.editMode = params['buCode5'] != null;
      this.initForm();
      
    });
  }
  onSubmit() {
    console.log(this.branchForm.value);
    if (this.editMode) {
      this.branchService.updateBranch(this.buCode5, this.branchForm.value);
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
    let status = '';
    let openedDt = new Date();
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
      const branch = this.branchService.getBranch(this.buCode5);
      status = branch.status;
      openedDt = branch.openedDt;
      address = branch.address;
      city = branch.city;
      state = branch.stateName;
      country = branch.countryName;
      currency = branch.currency;
      phone = branch.phone;
      businessHours = branch.businessHours;
      longitude = branch.longitude;
      latitude = branch.latitude;
    }
    this.branchForm = new FormGroup({
      buCode5: new FormControl(this.buCode5, [Validators.required]),
      status: new FormControl(status, [Validators.required]),
      openedDt: new FormControl(openedDt, [Validators.required]),
      address: new FormControl(address, [Validators.required]),
      city: new FormControl(city, [Validators.required]),
      stateName: new FormControl(state, [Validators.required]),
      countryName: new FormControl(country, [Validators.required]),
      currency: new FormControl(currency, [Validators.required]),
      phone: new FormControl(phone, [Validators.required]),
      businessHours: new FormControl(businessHours, [Validators.required]),
      latitude: new FormControl(latitude, [Validators.required]),
      longitude: new FormControl(longitude, [Validators.required])
    });
  }
}
