import { Injectable } from '@angular/core';
import { IPaymentBill } from 'src/interfaces/payment-bills';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, query, collection, getDocs } from "firebase/firestore";
import { environment } from 'src/environments/environment';

const firebaseApp = initializeApp({
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
});

const db = getFirestore(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  paymentBills : IPaymentBill[] = [];
  private dbPath = '/bills';
  
  constructor(){
  }

  async getBillsList(): Promise<any>{
    try{
      const billRef = collection(db, this.dbPath);
      const querySnap = await query(billRef);
      const docSnap = await getDocs(querySnap);
      
      docSnap.forEach((doc) => {
        if (doc.exists()) {

          let data = doc.data();
          this.paymentBills.push(data as IPaymentBill);
        }
      });

      return this.paymentBills;
    } catch(error){
      alert("GetBillsList: " + error);
    }
  }

  async getDocument(document: string): Promise<any>{
    try{
      const docRef = doc(db, this.dbPath, document);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        alert("No docSnap.data!");
      }

      return null;
    } catch(error){
      alert(error);
    }
  }


  getBills(){
    // debugger;
    // const db = getDatabase();
    // const starCountRef = ref(db, this.dbPath);
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log('data: ', data);
    // });
    
   }

   async createNewBill(bill: IPaymentBill) : Promise<void> {
    await setDoc(doc(db, this.dbPath, bill.Item),{
      Id: bill.Id,
      Key: bill.Key,
      Item: bill.Item,
      DueDate: bill.DueDate,
      Status: bill.Status,
      Value: bill.Value
    })
   }

  //  createBills(payBill: PaymentBill) : void {
  //     this.paymentbills.push({
  //       Id: payBill.Id,
  //       Key: payBill.Key,
  //       Itens: payBill.Item,
  //       DueDate: payBill.DueDate,
  //       Status: payBill.Status,
  //       UpdateTime: payBill.UpdateTime,
  //       Value: payBill.Value
  //     });
  //  }

  //  updateBills(key: string, value: any): Promise<void>{
  //   //  return this.paymentbills.update(key, value);
  //  }
  updateBills(key: string, value: any) {
    //
  }

  //  deleteBill(key: string): Promise<void>{
  //    return this.paymentbills.remove(key);
  //  }
  deleteBill(key: string){
    //return this.paymentbills.remove(key);
  }


}