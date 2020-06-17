import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { matchEmail, ratingParms } from './../custom-validators';
import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customerRootFormGroup: FormGroup;

  emailControl = new FormControl();

  customer = new Customer();

  messageError: string;

  get adresses(): FormArray {
    return this.customerRootFormGroup.get('adresses') as FormArray;
  }

  private validationMessages = {
    required: 'Please enter your email Adresse',
    email: 'Please enter a valid mail adresse',
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.customerRootFormGroup = this.formBuilder.group({
      firstName: [
        { value: 'n/a', disabled: false },
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          emailConfirmation: ['', Validators.required],
        },
        { validators: matchEmail('email', 'emailConfirmation') }
      ),
      phone: '',
      notification: 'email',
      rating: [null, [Validators.required, ratingParms(0, 5)]],
      sendCatalogue: true,
      adresses: this.formBuilder.array([this.buildAdresses()]),
    });
    this.customerRootFormGroup
      .get('notification')
      .valueChanges.subscribe((notification) => {
        this.sendNotification(notification);
      });

    const emailControl = this.customerRootFormGroup.get('emailGroup.email');

    emailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => this.setMessageError(emailControl));
  }

  buildAdresses(): FormGroup {
    return this.formBuilder.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: ['', Validators.required],
      state: '',
      zip: null,
    });
  }

  save() {}

  setMessageError(c: AbstractControl): void {
    this.messageError = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.messageError = Object.keys(c.errors)
        .map((key) => this.validationMessages[key])
        .join(' ');
    }
  }
  onSetSomeValue() {
    this.customerRootFormGroup.patchValue({
      lastName: 'Abdel',
    });
  }
  onSetAllValue() {
    this.customerRootFormGroup.setValue({
      firstName: 'abdel',
      lastName: 'abdou',
      email: 'abdel@gmail.com',
      sendCatalogue: true,
    });
  }
  sendNotification(notification: string): void {
    const phoneControl = this.customerRootFormGroup.get('phone');
    if (notification === 'phone') {
      phoneControl.setValidators([Validators.required]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  onClickAddOtherAdresse(): void {
    this.adresses.push(this.buildAdresses());
  }
}
