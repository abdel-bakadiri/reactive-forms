import { ratingParms, matchEmail } from "./../custom-validators";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Customer } from "./customer";
import { rating } from "../custom-validators";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  customerRootFormGroup: FormGroup;

  emailControl = new FormControl();

  customer = new Customer();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.customerRootFormGroup = this.formBuilder.group({
      firstName: [
        { value: "n/a", disabled: false },
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.formBuilder.group(
        {
          email: ["", [Validators.required, Validators.email]],
          emailConfirmation: ["", Validators.required],
        },
        { validators: matchEmail("email", "emailConfirmation") }
      ),
      phone: "",
      notification: "email",
      rating: [null, [Validators.required, ratingParms(0, 5)]],
      sendCatalogue: true,
    });
    // this.customerRootFormGroup = new FormGroup({
    //   firstName: new FormControl(),m
    //   lastName: new FormControl(),
    //   email: this.emailControl,
    //   sendCatalogue: new FormControl(true),
    // });
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
  sendNotification(notification: string): void {
    const phoneControl = this.customerRootFormGroup.get("phone");
    if (notification === "phone") {
      phoneControl.setValidators([Validators.required]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
