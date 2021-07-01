import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { PaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-detail-bills',
  templateUrl: './detail-bills.component.html',
  styleUrls: ['./detail-bills.component.scss']
})
export class DetailBillsComponent implements OnInit {

  form!: FormGroup;
  paymentBill! : PaymentBill;
  paymentBills: any;
  
  constructor(private paymentBillsService : BillsService) {
   }

  ngOnInit(): void {
    this.getPaymentBillsList();
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
        item: new FormControl(''),
        value: new FormControl(''),
        dueDate:  new FormControl(''),
        status:  new FormControl('')
      });
  }

  updateStatus(isActive: boolean){
    this.paymentBillsService
    .updateBills(this.paymentBill.Id, { Status: isActive })
    .catch(err => console.log(err));
  }

  deleteItem(paymentBill: any){
    debugger;
    this.paymentBillsService
    .deleteBill(paymentBill.Id)
    .catch(err => console.log(err));

    this.getPaymentBillsList();
  }

  getPaymentBillsList() {
    this.paymentBillsService.getBillsList().snapshotChanges()
    .pipe(map(changes =>
            changes.map(c =>
              ({ Id: c.payload.key, ...c.payload.val()})
            )
        )
    ).subscribe(bills => {
      this.paymentBills = bills;
    });
  }

}
