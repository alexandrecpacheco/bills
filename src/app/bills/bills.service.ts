import { Injectable } from '@angular/core';
import { IPaymentBill } from 'src/interfaces/payment-bills';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, query, collection, getDocs, deleteDoc } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';

const firebaseApp = initializeApp({
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
});

const auth = getAuth();
const db = getFirestore(firebaseApp);

@Injectable({
  providedIn: 'root'
})

export class BillsService {

  paymentBills : IPaymentBill[] = [];
  private dbPath = '/bills';
  
  constructor(private router: Router){
  }

  async createNewUser(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    })
    .finally();
  }

  async signInUser(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('User: ', user);
      this.router.navigate(['/bills'])
      // ...
    })
    .catch((error) => {
      debugger;
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    .finally();
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
        alert("No data has been found!");
      }
      return null;
    } catch(error){
      alert("GetDocument: " + error);
    }
  }

  async createNewBill(bill: IPaymentBill) : Promise<void> {
    if (bill){
      await setDoc(doc(db, this.dbPath, bill.Item),{
        Id: bill.Id,
        Key: bill.Key,
        Item: bill.Item,
        DueDate: bill.DueDate,
        Status: bill.Status,
        Value: bill.Value
      })
      .catch((error) => { alert("CreateNew: " + error); });
    }
    else {
      alert("CreateNewBill without values");
    }
  }

  async updateBill(bill: IPaymentBill) : Promise<void> {
    if (bill){
      await setDoc(doc(db, this.dbPath, bill.Item),{
        Id: bill.Id,
        Key: bill.Key,
        Item: bill.Item,
        DueDate: bill.DueDate,
        Status: bill.Status,
        Value: bill.Value
      }, { merge: true })
      .catch((error) => { alert("CreateNew: " + error); });
    }
    else {
      alert("CreateNewBill without values");
    }
  }

  async updateStatus(item: string, status: any) {
    await setDoc(doc( db, this.dbPath, item), {
      Status: status
    })
    .catch((error) => { alert("UpdateStatus: " + error); });
  }

  async deleteBill(item: string){
    await deleteDoc(doc (db, this.dbPath, item));
  }
}