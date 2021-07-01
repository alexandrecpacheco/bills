import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { PaymentBills } from 'src/interfaces/payment-bills';


@Injectable({
  providedIn: 'root'
})
export class BillsService {

  private dbPath = '/bills';

  paymentbillsRef : AngularFireList<PaymentBills>;

  constructor(private db: AngularFireDatabase) {
    this.paymentbillsRef = this.db.list(this.dbPath);
   }

   createBills(payBills: PaymentBills) : void {
      this.paymentbillsRef.push(payBills);
   }

   updateBills(key: string, value: any): Promise<void>{
     return this.paymentbillsRef.update(key, value);
   }

   deleteBills(key: string): Promise<void>{
     return this.paymentbillsRef.remove(key);
   }

   getBillsList(): AngularFireList<PaymentBills>{
     return this.paymentbillsRef;
   }

   deleteAll(): Promise<void>{
     return this.paymentbillsRef.remove();
   }

}