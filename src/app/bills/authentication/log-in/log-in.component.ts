import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/interfaces/user';
import { BillsService } from '../../bills.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
  @Input() user!: User;
  form!: FormGroup;
  email = '';
  password = '';
  showPassword = false;

  constructor(private billsService : BillsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    localStorage.setItem('LoginUser', '');
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      Email: new FormControl({value: ''}),
      Password: new FormControl({value: ''})
    });
  }

  logIn() {
    if (this.form.valid){
      this.billsService.createNewUser(this.email, this.password);
    }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
}

