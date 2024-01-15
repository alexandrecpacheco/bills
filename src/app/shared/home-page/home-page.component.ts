import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMonths } from 'src/interfaces/months';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }
  show = false;

  months: IMonths[] = [{ name: "Janeiro", number: 1 }, { name: "Fevereiro", number: 2 }, { name: "Março", number:3 }, { name: "Abril", number:4 }, { name: "Maio", number:5 }
  , { name: "Junho", number:6 }, { name: "Julho", number:7 }, { name: "Agosto", number:8 }, { name: "Setembro", number:9 }, { name: "Outubro", number:10 }, { name: "Novembro", number:11 }, { name: "Dezembro", number:12 }];

  ngOnInit(): void {
  }

  redirect(month: any) {
    this.router.navigate(['/bills'], { state: { data: month }});
  }

}
