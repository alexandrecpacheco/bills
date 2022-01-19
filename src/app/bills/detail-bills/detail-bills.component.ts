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
  bills: any;

  constructor(private service : BillsService, 
    private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.createForm();
    this.getPaymentBillsList();
  }

  createForm(): void {
    this.form = this.fb.group({
      Item: new FormControl({value: ""}),
      Value: new FormControl({value: ""}),
      DueDate: new FormControl({value: ""}),
      Status: new FormControl({value: ""})
    });
  }

  updateStatus(paymentBill: IPaymentBill, isActive: boolean){
    this.service
    .updateBills(
      paymentBill.Key, 
      { Status: isActive }
    )
    //.catch(err => console.log(err));
  }

  deleteItem(paymentBill: any){
    this.service
    .deleteBill(paymentBill.Id)
    //.catch(err => console.log(err));

    this.getPaymentBillsList();
  }

  getPaymentBillsList() {
    this.loading = true;
    let billsList = this.service.getBillsList();
    billsList.then((data) =>{
        this.paymentBills = data;
        this.loading = false;
      })
      .catch(err => alert(`GetPaymentBillsList ${err}`));
  }

  ngSubmit(form: FormGroup){
    //
  }

}
