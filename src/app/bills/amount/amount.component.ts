import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {

  amount: string = 'R$ 1.300,00';
  payed: string = 'R$ 2.500,00'
  constructor() { }

  ngOnInit(): void {
  }

}
