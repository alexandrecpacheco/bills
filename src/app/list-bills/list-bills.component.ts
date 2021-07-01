import { Component, OnInit } from '@angular/core';
import { BillsService } from '../bills/bills.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-bills',
  templateUrl: './list-bills.component.html',
  styleUrls: ['./list-bills.component.scss']
})
export class ListBillsComponent implements OnInit {

  paymentBills: any;

  constructor(private paymentBillsService : BillsService) { }

  ngOnInit(): void {
    this.getPaymentBillsList();
  }

  getPaymentBillsList() {
    this.paymentBillsService.getBillsList().snapshotChanges()
    .pipe(
      map(changes =>
            changes.map(c =>
              ({ Id : c.payload.key, ...c.payload.val()})
            )
        )
    ).subscribe(paymentBill => {
      this.paymentBills = paymentBill;
    });
  }

  deletePaymentBills() {
    this.paymentBillsService.deleteAll()
    .catch(err => console.log(err));
  }

}
