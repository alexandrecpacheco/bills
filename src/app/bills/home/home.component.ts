import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPaymentBill, PaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  updateStatus(bill: IPaymentBill){
    this.loading = true;
    this.service.updateStatus(bill).then(() => {
      this.getPaymentBills();
    });
  }

  updateAllStatus(){
    if (confirm(`Deseja pendenciar TODOS os status?`)){
      this.service.changeAllStatusToPending();
    }
  }

  async deleteItem(bill: IPaymentBill){
    if (confirm(`Deseja apagar o item ${bill.Item}?`)){
      let isDeleted = await this.service.deleteBill(bill);
      if (isDeleted)
        this.getPaymentBills();
    }
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

  async onSubmit() {
    //await new Promise(resolve => setTimeout(resolve, 2500));
  }

  private createForm(bill: PaymentBill) {
    this.form = this.fb.group({
      Item: [bill.Item],
      Value: [bill.Value],
      DueDate: [bill.DueDate],
      Status: [bill.Status]
    });
  }

}
