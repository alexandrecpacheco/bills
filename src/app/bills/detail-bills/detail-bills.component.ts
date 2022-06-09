import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPaymentBill, PaymentBill } from 'src/interfaces/payment-bills';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-detail-bills',
  templateUrl: './detail-bills.component.html',
  styleUrls: ['./detail-bills.component.scss']
})

export class DetailBillsComponent implements OnInit {
  
  form!: FormGroup;
  paymentBills: IPaymentBill[] = [];
  loading = false;
  paymentBill!: IPaymentBill;
  totalPending: number = 0;
  totalPayed: number = 0;
  status: boolean = false;
  isEdited: boolean = false;
  btnElement!: HTMLElement | null | undefined;

  constructor(private service : BillsService, 
    private fb: FormBuilder, private ElByClassName: ElementRef) {
   }

  ngOnInit(): void {
    this.createForm(new PaymentBill());
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

  async deleteItem(bill: IPaymentBill){
    if (confirm(`Deseja apagar o item ${bill.Item}?`)){
      let isDeleted = await this.service.deleteBill(bill);
      if (isDeleted)
        this.getPaymentBills();
    }
  }

  cleanBillHTML(){
    const btnElement = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.main-bill.ng-star-inserted'
      );
    if (btnElement !== null)
      btnElement.outerHTML = '';
  }

  async getPaymentBills() {
    this.cleanBillHTML();
    this.loading = true;
    this.service.getBillsList().then((data) =>{
      this.paymentBills = [];
      if (data){
        this.paymentBills = data;
        this.getTotalBills();
        this.loading = false;
      }
    }).catch(err => alert(`GetPaymentBills ${err}`));
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

  updateDueDate(bill: IPaymentBill) {
    bill.DueDate = this.paymentBill.DueDate;
    this.service.updateBill(bill);
  }

  updateValue(bill: IPaymentBill) {
    bill.Value = this.paymentBill.Value;
    this.service.updateBill(bill);
  }
  
  async onSubmit() {
    this.isEdited = !this.isEdited;
    await new Promise(resolve => setTimeout(resolve, 2500));
  }

  setEdit() {
    this.isEdited = !this.isEdited;
  }

  async save() {
    this.isEdited = !this.isEdited;
    this.onSubmit();
    await new Promise(resolve => setTimeout(resolve, 2500));
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
