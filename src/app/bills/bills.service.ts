import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { PaymentBill } from 'src/interfaces/payment-bills';


@Injectable({
  providedIn: 'root'
})
export class BillsService {

  private dbPath = '/bills/item';

  paymentbills : AngularFireList<PaymentBill>;

  constructor(private db: AngularFireDatabase) {
    this.paymentbills = this.db.list(this.dbPath);
   }

   createBills(payBills: PaymentBill) : void {
      this.paymentbills.push(payBills);
   }

   updateBills(key: string, value: any): Promise<void>{
     return this.paymentbills.update(key, value);
   }

   deleteBill(key: string): Promise<void>{
     return this.paymentbills.remove(key);
   }

   getBillsList(): AngularFireList<PaymentBill>{
     return this.paymentbills;
   }
}