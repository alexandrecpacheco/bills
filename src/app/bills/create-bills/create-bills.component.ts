import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPaymentBill } from 'src/interfaces/payment-bills';
import { IDay } from 'src/interfaces/day';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-create-bills',
  templateUrl: './create-bills.component.html',
  styleUrls: ['./create-bills.component.scss']
})
export class CreateBillsComponent implements OnInit {

  success: boolean = false;
  selected = "Pendente";
  form!: FormGroup;
  paymentBill!: IPaymentBill;
  days: IDay[] = [
    {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}, {value: 7}, {value: 8}, {value: 9}, {value: 10}, {value: 11},  
    {value: 12}, {value: 13}, {value: 14}, {value: 15}, {value: 16}, {value: 17}, {value: 18}, {value: 19}, {value: 20}, {value: 21},
    {value: 22}, {value: 23}, {value: 24}, {value: 25}, {value: 26}, {value: 27}, {value: 28}, {value: 29}, {value: 30}, {value: 31}
  ];
  constructor(private billsService : BillsService,
    private formControl: FormControl) {
    }

  ngOnInit(): void {
    this.initializeObject();
    this.createForm();
  }

  async onSubmit(){
    this.paymentBill.Key = Math.floor(Date.now()/1000).toString();
    
    this.billsService.createNewBill(this.paymentBill)
    .then(async () => {
      this.success = true;
      await this.delay(2000);
      this.success = false;
      this.initializeObject();
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  private createForm(): void {
    this.form = new FormGroup({
        Item: new FormControl('', Validators.required),
        Value: new FormControl('', Validators.required),
        DueDate:  new FormControl('', Validators.required),
        Status:  new FormControl('', Validators.required),
        Day: new FormControl('')
      });
  }

  private initializeObject() {
    this.paymentBill = {
      Id: '',
      Key: '',
      Item: '',
      DueDate: '',
      Status: false,
      Value: 0,
      Items: []
    };
  }
}
