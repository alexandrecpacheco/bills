import { Injectable, OnInit } from '@angular/core';
import { IPaymentBill } from 'src/interfaces/payment-bills';
import { initializeApp } from "firebase/app";
import { onSnapshot, getFirestore, setDoc, doc, getDoc, query, collection, getDocs, deleteDoc } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
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

export class BillsService implements OnInit {

  uid: string = '';
  paymentBills : IPaymentBill[] = [];
  
  constructor(private router: Router){
  }

  ngOnInit() {
    this.getUid();
  }

  async signOutUser() {
    signOut(auth).then(() => {
    }).catch((error) => {
      alert(`SignOut error: ${error}`);
    });
  }

  async login(email: string, password: string) {

    this.initializeUser();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      this.getToken(userCredential.user.uid);
      this.router.navigate(['/home']);
    })
    .catch((error) => {
      alert(`SignIn error: ${error.message}`);
    })
    .finally();

  }

  async getBillsList(): Promise<any>{
    try{
      this.uid = localStorage.getItem('SessionUser') ?? '';
      if (this.uid === ''){
        alert('Voce nao esta logado!');
        this.router.navigateByUrl('/sigIn');
      }

      this.paymentBills = [];
      const billRef = collection(db, this.uid);
      const querySnap = await query(billRef);
      const docSnap = await getDocs(querySnap);
      docSnap.forEach((doc) => {
        if (doc.exists()) {
          if (doc.data() !== undefined) {
            this.paymentBills.push(doc.data() as IPaymentBill);
            this.sortBills();
          }
          else 
            alert('Nenhum item foi encontrado...');
        }
      });

      return this.paymentBills;
    } catch(error){
      alert("GetBillsList: " + error);
    }
  }

  async getDocument(document: string): Promise<any> {
    try {
      const docRef = doc(db, this.uid, document);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        alert("Nenhum item foi encontrado!");
      }
      return null;
    } catch(error){
      alert("GetDocument: " + error);
    }
  }

  async createNewBill(bill: IPaymentBill) : Promise<void> {

    if (bill && this.uid !== ''){
      await setDoc(doc(db, this.uid, bill.Item), {
        Id: bill.Id,
        Key: bill.Key,
        Item: bill.Item,
        DueDate: bill.DueDate,
        Status: bill.Status,
        Value: bill.Value,
        Items: bill.Items
      })
      .catch((error) => { alert("CreateNew: " + error); })
      .finally();
    }
    else 
    { 
      alert("CreateNewBill without values"); 
    }
  }

  async updateBill(bill: IPaymentBill) : Promise<void> {
    
    if (!bill && this.uid === ''){
      alert("UpdateBill without values");
      return;
    }
    
    await setDoc(doc(db, this.uid, bill.Item),{
      Id: bill.Id,
      Key: bill.Key,
      Item: bill.Item,
      DueDate: bill.DueDate,
      Status: bill.Status,
      Value: bill.Value
    }, { merge: true })
    .catch((error) => {
      alert("UpdateBill: " + error); 
    });
  }

  //TODO: Edit data
  async updateStatus(bill: IPaymentBill) {

    await setDoc(doc(db, this.uid, bill.Item), {
      Item: bill.Item,
      Value: bill.Value,
      DueDate: bill.DueDate,
      Status: !bill.Status
    })
    .catch((error) => { 
      alert("UpdateStatus: " + error);
      return false;
    })
    .finally(() => {
      return true;
    });

    this.updateItem(bill);
    return true;
  }

  async changeAllStatusToPending() {
    this.paymentBills.forEach((bill) => {
      setDoc(doc(db, this.uid, bill.Item), {
        Item: bill.Item,
        Value: bill.Value,
        DueDate: bill.DueDate,
        Status: false
      }).catch((error) => { 
        alert("UpdateStatus: " + error);
        return false;
      }).finally(() => {
        this.updateItem(bill);
        return true;
      });
    });
  }

  async deleteBill(bill: IPaymentBill){
    await deleteDoc(doc (db, this.uid, bill.Item))
    .catch((error) => {
      alert('Error Delete: ' + error);
      return false;
    }).finally(() => {
      return true;
    });
    return true;
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

  /* Private Methods */
  private getUid() {
    this.uid = `/${localStorage.getItem('SessionUser')}` ?? '/';
  }

  private updateItem(bill: IPaymentBill) {
   
    onSnapshot(doc(db, this.uid, bill.Item), (doc) => {
      let _bill = doc.data() as IPaymentBill;
      if (_bill !== undefined) {
        this.paymentBills.forEach((item, index) => {
            if (item.Item == _bill.Item) {
              this.paymentBills.splice(index, 1);
              this.paymentBills.push(_bill);
              this.sortBills();
            }
        });
      }
    });
  }

  private sortBills() {
    this.paymentBills.sort((n1, n2) => {
      if (n1 > n2) return 1;
      if (n1 < n2) return -1;
    
      return 0;
    });
  }

  private getToken(uid: string) {
    localStorage.setItem('SessionUser', uid);
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

}