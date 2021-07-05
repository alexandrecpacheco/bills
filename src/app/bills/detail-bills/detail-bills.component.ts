import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { PaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-detail-bills',
  templateUrl: './detail-bills.component.html',
  styleUrls: ['./detail-bills.component.scss']
})
export class DetailBillsComponent implements OnInit, AfterViewInit {
  
  message: string = 'loading :(';
  form!: FormGroup;
  paymentBills: any;
  
  constructor(private paymentBillsService : BillsService, private cdr: ChangeDetectorRef) {
   }

  ngOnInit(): void {
    this.getPaymentBillsList();
    this.createForm();
  }

  ngAfterViewInit() {
    this.message = 'all done loading :)'
    this.cdr.detectChanges();
  }

  createForm(): void {
    this.form = new FormGroup({
        item: new FormControl(''),
        value: new FormControl(''),
        dueDate:  new FormControl(''),
        status:  new FormControl('')
      });
  }

  updateStatus(paymentBill: PaymentBill, isActive: boolean){
    debugger
    this.paymentBillsService
    .updateBills(paymentBill.Key, { Status: isActive })
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
