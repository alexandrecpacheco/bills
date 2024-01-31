import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createItem(){
    this.router.navigate(['/bills']);
  }
}
