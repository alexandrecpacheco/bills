export interface IPaymentBill{
    DueDate : string;
    Id: string;
    Item : string;
    Key : string;
    Status : boolean;
    Value : number;
    Items: IItemPaymentBill[];
}

export interface IItemPaymentBill {
    DueDate : string;
    Id: string;
    Item : string;
    Key : string;
    Status : boolean;
    Value : number;
}

export class PaymentBill {
    Item : string = '';
    DueDate : string = '';
    Status : boolean = false;
    Value : number = 0;
}