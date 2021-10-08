import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { PaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-detail-bills',
  templateUrl: './detail-bills.component.html',
  styleUrls: ['./detail-bills.component.scss']
})
export class DetailBillsComponent implements OnInit {
  
  form!: FormGroup;
  paymentBills: PaymentBill[] = [];
  isDisabled = true;
  public loading = true;
  bills: any;
  
  constructor(private service : BillsService, 
    private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.getPaymentBillsList();
  }

  createForm(): void {
    this.form = this.fb.group({
      Itens: new FormControl({value: ""}),
      Value: new FormControl({value: ""}),
      DueDate: new FormControl({value: ""}),
      Status: new FormControl({value: ""})
    });

    this.loading = false;
  }

  updateStatus(paymentBill: PaymentBill, isActive: boolean){
    this.service
    .updateBills(
      paymentBill.Key, 
      { Status: isActive }
    )
    .catch(
      err => console.log(err)
    );
  }

  deleteItem(paymentBill: any){
    this.service
    .deleteBill(paymentBill.Id)
    .catch(err => console.log(err));

    this.getPaymentBillsList();
  }

  getPaymentBillsList() {
    debugger;
    this.loading = true;
    this.service.getBillsList().valueChanges()
    .pipe(map(changes =>
      changes.map(c =>
        this.paymentBills.push(c)
      ), 
      this.createForm()))
    .subscribe((sub) => {
      debugger;
      this.loading = false;
    },
    (error) => {
      this.loading = false;
    });
  }

  ngSubmit(form: FormGroup){
    //
  }

}
