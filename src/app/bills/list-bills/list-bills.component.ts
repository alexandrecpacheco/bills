import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DetailBillsComponent } from '../detail-bills/detail-bills.component';

@Component({
  selector: 'app-list-bills',
  templateUrl: './list-bills.component.html',
  styleUrls: ['./list-bills.component.scss']
})

export class ListBillsComponent implements OnInit {

  @ViewChild(DetailBillsComponent) private detailComponent!: DetailBillsComponent;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onTabChanged(event: MatTabChangeEvent) {
    if(event.index == 0)
        this.detailComponent.getPaymentBills();
  }
  
  // reloadCurrentPage(){
  //   let currentUrl = this.router.url;
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //       this.router.navigate([currentUrl]);
  //   });
  // }
 }
