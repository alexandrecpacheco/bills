import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IPaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-detail-bills',
  templateUrl: './detail-bills.component.html',
  styleUrls: ['./detail-bills.component.scss']
})
export class DetailBillsComponent implements OnInit {
  
  form!: FormGroup;
  paymentBills!: IPaymentBill[];
  loading = false;
  paymentBill!: IPaymentBill;
  totalValue: number = 0;

  constructor(private service : BillsService, 
    private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.initializeObject();
    this.getPaymentBillsList();
    this.createForm();
  }

  updateStatus(paymentBill: IPaymentBill, isActive: boolean){
    this.service.updateStatus(
      paymentBill.Item, 
      { Status: isActive }
    );
  }

  deleteItem(paymentBill: any){
    if (confirm(`Deseja apagar o item ${paymentBill.Item}?`)){
      this.service.deleteBill(paymentBill.Item);
      this.getPaymentBillsList();
      window.onload;
    }
  }

  getPaymentBillsList() {
    this.loading = true;
    let billsList = this.service.getBillsList();
    debugger;
    billsList.then((data) =>{
        this.paymentBills = data;
        this.loading = false;
        this.getTotalBills();
      })
      .catch(err => alert(`GetPaymentBillsList ${err}`));
  }

  getTotalBills(){
    this.paymentBills.forEach(element => {
      this.totalValue += +element.Value;
    });
  }

  updateDueDate(bill: IPaymentBill) {
    console.log(bill);
    console.log("Value: ", this.paymentBill.DueDate);
    bill.DueDate = this.paymentBill.DueDate;
    this.service.updateBill(bill);
  }

  updateValue(bill: IPaymentBill) {
    console.log(bill);
    console.log("Value: ", this.paymentBill.Value);
    bill.Value = this.paymentBill.Value;
    this.service.updateBill(bill);
  }

  private initializeObject(): void {
    this.paymentBill = {
      Id: '',
      Key: '',
      Item: '',
      DueDate: '',
      Status: false,
      Value: 0
    };
  }

  private createForm(): void {
    this.form = this.fb.group({
      Item: new FormControl({value: ''}),
      Value: new FormControl({value: ''}),
      DueDate: new FormControl({value: ''}),
      Status: new FormControl({value: ''})
    });
  }

}
