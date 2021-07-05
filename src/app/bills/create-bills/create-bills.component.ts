import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-create-bills',
  templateUrl: './create-bills.component.html',
  styleUrls: ['./create-bills.component.scss']
})
export class CreateBillsComponent implements OnInit {

  submitted = false;
  form!: FormGroup;
  paymentBill!: PaymentBill;

  constructor(private billsService : BillsService,
    private formControl: FormControl) {
    }

  ngOnInit(): void {
    this.initializeObject();
    this.createForm();
  }

  addNewItem(): void {
    if (this.form.valid){
      this.submitted = false;
    }
  }

  onSubmit(){
    this.submitted = true;
    this.paymentBill.Key = Math.floor(Date.now()/1000).toString();
    this.billsService.createBills(this.paymentBill);
  }

  createForm(): void {
    this.form = new FormGroup({
        item: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
        dueDate:  new FormControl('', Validators.required),
        status:  new FormControl('', Validators.required)
      });
  }

  initializeObject(): void {
    this.paymentBill = {
      Id: '',
      Key: '',
      Item: '',
      DueDate: '',
      Status: false,
      Value: '',
      UpdateTime: new Date()
    };
  }
}
