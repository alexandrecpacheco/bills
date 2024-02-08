import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPaymentBill } from '../../../interfaces/payment-bills';
import { Day, Days } from '../../../interfaces/day';
import { BillsService } from '../bills.service';
import { Month, Months } from '../../classes/months.model';
import { IItemBill, IMonth } from '../../../interfaces/months';

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
  itemBill!: IItemBill;
  month!: IMonth;
  days: Day[] = Days.allDays;
  months: Month[] = Months.allMonths;
  
  constructor(private billsService : BillsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeBill();
    this.createFormBill();
  }

  async onSubmit(){
    if (this.form.valid){
      this.itemBill.dueDate = this.form.value.dueDate;
      this.itemBill.item = this.form.value.item;
      this.itemBill.key = Math.floor(Date.now()/1000).toString();
      this.itemBill.status = this.form.value.status;
      this.itemBill.value = this.form.value.value;
      //this.month.number = this.form.value.month.split(' - ')[0];   
      this.month.description = this.form.value.month;
      this.month.item?.push(this.itemBill);

      this.billsService.createMonthBill(this.month)
        .then(async () => {
          this.success = true;
          await this.delay(2000);
          this.success = false;
          this.createFormBill();
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private initializeBill() {
    this.month = {
      description: '',
      number: 0,
      item: []
    }

    this.itemBill = {
      id: '',
      dueDate: '',
      item: '',
      key: '',
      status: false,
      value: 0
    }
  }

  private createFormBill() {
    this.form = this.fb.group({
      dueDate: ['', Validators.required],
      item: ['', Validators.required],
      status: [false, Validators.required],
      month: ['', Validators.required],
      value: [0, Validators.required],
    });
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
