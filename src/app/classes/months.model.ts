export class Month {
    constructor(public number: number, public description: string, public item?: ItemBill[]) {
      this._number = number;
      this._description = description;
      this._item = item;
    }

    private _number!: number;
    private _description!: string;
    private _item?: ItemBill[];
  }

  export class Months {
    static readonly allMonths: Month[] = [
      new Month(1, 'Jan'),
      new Month(2, 'Fev'),
      new Month(3, 'Mar'),
      new Month(4, 'Abr'),
      new Month(5, 'Mai'),
      new Month(6, 'Jun'),
      new Month(7, 'Jul'),
      new Month(8, 'Ago'),
      new Month(9, 'Set'),
      new Month(10, 'Out'),
      new Month(11, 'Nov'),
      new Month(12, 'Dez'),
    ];
  }
  
export class ItemBill {
  constructor(id: string, dueDate: string, item: string, key: string, status: boolean, value: number){
    this._id = id;
    this._dueDate = dueDate;
    this._item = item;
    this._key = key;
    this._status = status;
    this._value = value;
  }

  private _id: string;
  private _dueDate : string;
  private _item : string;
  private _key : string;
  private _status : boolean;
  private _value : number;
}

