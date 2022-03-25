import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-bills',
  templateUrl: './list-bills.component.html',
  styleUrls: ['./list-bills.component.scss']
})
export class ListBillsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  debitosMensais($event: any){
    if ($event.index === 0)
      window.location.reload();
  }
 }
