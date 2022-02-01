import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-create-bills',
  templateUrl: './create-bills.component.html',
  styleUrls: ['./create-bills.component.scss']
})
export class CreateBillsComponent implements OnInit {

  selected = "Pendente";
  submitted = false;
  form!: FormGroup;
  paymentBill!: IPaymentBill;

  constructor(private billsService : BillsService,
    private formControl: FormControl) {
    }

  ngOnInit(): void {
    this.initializeObject();
    this.createForm();
  }

  onSubmit(){
    this.submitted = true;
    this.paymentBill.Key = Math.floor(Date.now()/1000).toString();
    this.billsService.createNewBill(this.paymentBill);
  }

  private createForm(): void {
    this.form = new FormGroup({
        Item: new FormControl('', Validators.required),
        Value: new FormControl('', Validators.required),
        DueDate:  new FormControl('', Validators.required),
        Status:  new FormControl('', Validators.required)
      });
  }

  private initializeObject() {
    this.paymentBill = {
      Id: '',
      Key: '',
      Item: '',
      DueDate: '',
      Status: false,
      Value: 0
    };
  }
}
