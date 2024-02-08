export interface IMonth {
    number: number;
    description: string;
    item?: IItemBill[];
 }
 
 export interface IItemBill {
   id: string;
   dueDate : string;
   item : string;
   key : string;
   status : boolean;
   value : number;
 }
 