import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl } from "@angular/forms";

import { Customer } from "./customer";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  customerRootFormGroup: FormGroup;

  emailControl = new FormControl();

  customer = new Customer();

  constructor() {}

  ngOnInit() {
    this.customerRootFormGroup = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: this.emailControl,
      sendCatalogue: new FormControl(true),
    });
  }

  save() {}
  onSetSomeValue() {
    this.customerRootFormGroup.patchValue({
      lastName: "Abdel",
    });
  }
  onSetAllValue() {
    this.customerRootFormGroup.setValue({
      firstName: "abdel",
      lastName: "abdou",
      email: "abdel@gmail.com",
      sendCatalogue: true,
    });
  }
}
