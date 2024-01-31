import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPaymentBill, PaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  form!: FormGroup;
  paymentBills: IPaymentBill[] = [];
  loading = false;
  paymentBill!: IPaymentBill;
  totalPending: number = 0;
  totalPayed: number = 0;
  status: boolean = false;
  btnElement!: HTMLElement | null | undefined;
  
  constructor(private service : BillsService, 
    private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.createForm(new PaymentBill());
    this.getPaymentBills();
  }

  async getPaymentBills() {
    this.loading = true;
    this.service.getBillsList().then((data) =>{
      this.paymentBills = [];
      if (data){
        this.paymentBills = data;
        this.getTotalBills();
        this.loading = false;
      }
    }).catch(err =>{ alert(`GetPaymentBills ${err}`); this.loading = false; });
  }

  getTotalBills(){
    this.totalPending = 0;
    this.totalPayed = 0;
    this.paymentBills.forEach(bill => {
      if (bill.Status === false){
        this.totalPending += +bill.Value ?? 0;
      }
      else{
        this.totalPayed += +bill.Value ?? 0;
      }
    });
  }

  //#region [ Private Methods ]
  
  private createForm(bill: PaymentBill) {
    this.form = this.fb.group({
      Item: [bill.Item],
      Value: [bill.Value],
      DueDate: [bill.DueDate],
      Status: [bill.Status]
    });
  }

  //#endregion

}
