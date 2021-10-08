import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { PaymentBill } from 'src/interfaces/payment-bills';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  private dbPath = '/bills';
  paymentbills : AngularFireList<any>;
  paymentbillRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.paymentbillRef = this.db.object(this.dbPath);
    this.paymentbills = this.db.list(this.dbPath);
   }

   createBills(payBill: PaymentBill) : void {
      this.paymentbills.push({
        Id: payBill.Id,
        Key: payBill.Key,
        Itens: payBill.Itens,
        DueDate: payBill.DueDate,
        Status: payBill.Status,
        UpdateTime: payBill.UpdateTime,
        Values: payBill.Values
      });
   }

   updateBills(key: string, value: any): Promise<void>{
     return this.paymentbills.update(key, value);
   }

   deleteBill(key: string): Promise<void>{
     return this.paymentbills.remove(key);
   }

  getBillsList(): AngularFireList<any> {
    return this.db.list(this.dbPath);
  } 

}