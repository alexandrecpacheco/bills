import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BillsService } from 'src/app/bills/bills.service';
import { ItemsComponent } from 'src/app/bills/items/items.component';
import { Month, Months } from 'src/app/classes/months.model';
import { IPaymentBill } from 'src/interfaces/payment-bills';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  months: Month[] = Months.allMonths;
  currentMonth: number = 0;
  loading = false;
  paymentBills: IPaymentBill[] = [];
  
  constructor(private router: Router, 
    private service: BillsService) { }

  ngOnInit(): void {
    this.currentMonth = (new Date().getMonth() + 1);
  }

  onMonthButtonClick(monthId: number) {
    this.service.setSelectedMonthId(monthId);
  }

}
