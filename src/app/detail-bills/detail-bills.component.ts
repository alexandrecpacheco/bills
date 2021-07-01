import { Component, Input, OnInit } from '@angular/core';
import { PaymentBills } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills/bills.service';

@Component({
  selector: 'app-detail-bills',
  templateUrl: './detail-bills.component.html',
  styleUrls: ['./detail-bills.component.scss']
})
export class DetailBillsComponent implements OnInit {

  @Input() paymentBill! : PaymentBills;

  constructor(private paymentBillsService : BillsService) {
   }

  ngOnInit(): void {
  }

  updateStatus(isActive: boolean){
    this.paymentBillsService
    .updateBills(this.paymentBill.Id, { Status: isActive })
    .catch(err => console.log(err));
  }

  deleteItem(){
    this.paymentBillsService
    .deleteBills(this.paymentBill.Id)
    .catch(err => console.log(err));
  }
}
