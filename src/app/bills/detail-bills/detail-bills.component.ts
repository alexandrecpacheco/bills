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
  $paymentBills: IPaymentBill[] = [];
  loading = false;
  paymentBill!: IPaymentBill;
  totalPending: number = 0;
  totalPayed: number = 0;
  status: boolean = false;

  constructor(private service : BillsService, 
    private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.createForm();
    this.getPaymentBills();
  }

  updateStatus(bill: IPaymentBill){
    this.loading = true;
    this.service.updateStatus(bill).then(() => {
      this.getTotalBills();
      this.loading = false;
    });
  }

  updateAllStatus(){
    if (confirm(`Deseja pendenciar TODOS os status?`)){
      this.service.changeAllStatusToPending();
    }
  }

  deleteItem(bill: IPaymentBill){
    if (confirm(`Deseja apagar o item ${bill.Item}?`)){
      this.service.deleteBill(bill);
    }
  }

  getPaymentBills() {
    this.loading = true;
    this.service.getBillsList().then((data) =>{
      this.$paymentBills = data;
      this.getTotalBills();
      this.loading = false;
      })
      .catch(err => alert(`GetPaymentBills ${err}`));
  }

  getTotalBills(){
    this.$paymentBills.forEach(bill => {
      if (bill.Status === false)
        this.totalPending += +bill.Value ?? 0;
      else
        this.totalPayed += +bill.Value ?? 0;
    });
  }

  updateDueDate(bill: IPaymentBill) {
    bill.DueDate = this.paymentBill.DueDate;
    this.service.updateBill(bill);
  }

  updateValue(bill: IPaymentBill) {
    bill.Value = this.paymentBill.Value;
    this.service.updateBill(bill);
  }
  
  onSubmit() {
    debugger;
    console.warn(this.form.value);
  }

  private createForm(): void {
    this.form = this.fb.group({
      Item: new FormControl({value: ''}),
      Value: new FormControl({value: ''}),
      DueDate: new FormControl({value: ''}),
      Status: new FormControl({value: false})
    });
  }

}
