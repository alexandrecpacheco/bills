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
        Itens: new FormControl('', Validators.required),
        Values: new FormControl('', Validators.required),
        DueDate:  new FormControl('', Validators.required),
        Status:  new FormControl('', Validators.required)
      });
  }

  initializeObject(): void {
    this.paymentBill = {
      Id: '',
      Key: '',
      Itens: '',
      DueDate: '',
      Status: false,
      Values: '',
      UpdateTime: new Date()
    };
  }
}
