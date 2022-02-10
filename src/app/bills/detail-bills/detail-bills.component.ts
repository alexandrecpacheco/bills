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
  totalPending: number = 0;
  totalPayed: number = 0;
  txtStatus: string = '';
  status: boolean = false;

  constructor(private service : BillsService, 
    private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.initializeObject();
    this.createForm();
    this.getPaymentBills();
  }

  updateStatus(paymentBill: IPaymentBill){
    this.service.updateStatus(paymentBill);
    this.status = !this.status;
    this.txtStatus = this.status ? 'Pago' : 'Pendente';
  }

  updateAllStatus(){
    if (confirm(`Deseja alterar TODOS os status?`)){
      this.service.updateAllStatus();
    }
  }

  deleteItem(paymentBill: any){
    if (confirm(`Deseja apagar o item ${paymentBill.Item}?`)){
      this.service.deleteBill(paymentBill.Item);
    }
  }

  getPaymentBills() {
    this.loading = true;
    let billsList = this.service.getBillsList();
    billsList.then((data) =>{
        this.paymentBills = data;
        this.loading = false;
        this.getTotalBills();
      })
      .catch(err => alert(`GetPaymentBills ${err}`));
  }

  getTotalBills(){
    this.paymentBills.forEach(bill => {
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
      Status: new FormControl({value: false})
    });
  }

}
