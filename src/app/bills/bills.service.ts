import { Injectable } from '@angular/core';
import { IPaymentBill } from 'src/interfaces/payment-bills';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, query, collection, getDocs, deleteDoc } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { Router } from '@angular/router';
import { User } from 'src/interfaces/user';

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

  uid: string = '';
  paymentBills : IPaymentBill[] = [];
  
  constructor(private router: Router){
    this.getUid();
  }

  async signOutUser() {
    signOut(auth).then(() => {
    }).catch((error) => {
      alert(`SignOut error: ${error}`);
    });
  }

  private initializeUser() {
    return {
      Email: '',
      Name: '',
      Password: '',
      Token: '',
      User: '',
      Uid: ''
    };
  }

  async signInUser(email: string, password: string) {
    var user: User = this.initializeUser();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      this.getToken(userCredential.user.uid);

      user.Email = userCredential.user.email ?? '';
      user.Name = userCredential.user.displayName ?? '';
      user.Uid = userCredential.user.uid;
      
      this.router.navigate(['/bills']);
    })
    .catch((error) => {
      console.log(error.code);
      alert(`SignIn error: ${error.message}`);
    })
    .finally();
  }

  private getToken(uid: string) {
    localStorage.setItem('SessionUser', uid);
  }

  async getBillsList(): Promise<any>{
    try{
      this.uid = localStorage.getItem('SessionUser') ?? '';
      const billRef = collection(db, this.uid);
      const querySnap = await query(billRef);
      const docSnap = await getDocs(querySnap);
      docSnap.forEach((doc) => {
        if (doc.exists()) {
          let data = doc.data();
          if (data.Item.length > 0)
            this.paymentBills.push(data as IPaymentBill);
        }
        else {
          alert('Nenhum item foi encontrado...');
        }
      });

      return this.paymentBills;
    } catch(error){
      alert("GetBillsList: " + error);
    }
  }

  async getDocument(document: string): Promise<any>{
    try{
      const docRef = doc(db, this.uid, document);
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
    debugger;
    if (bill && this.uid !== ''){
      await setDoc(doc(db, this.uid, bill.Item), {
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
    
    if (bill && this.uid !== ''){
      await setDoc(doc(db, this.uid, bill.Item),{
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
    await setDoc(doc( db, this.uid, item), {
      Status: status
    })
    .catch((error) => { alert("UpdateStatus: " + error); });
  }

  async deleteBill(item: string){
    debugger;
    await deleteDoc(doc (db, this.uid, item));
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

  private getUid() {
    this.uid = `/${localStorage.getItem('SessionUser')}` ?? '/';
  }
}