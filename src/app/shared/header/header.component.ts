import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: string = 'Minhas Contas';
  
  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('Going back...');
  }

  goNext() {
    console.log('Going Next...');
  }
}
