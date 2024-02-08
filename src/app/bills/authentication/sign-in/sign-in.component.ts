import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/interfaces/user';
import { BillsService } from '../../bills.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  @Input() user!: User;
  form!: FormGroup;

  constructor(private billsService : BillsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    localStorage.setItem('SessionUser', '');
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      Email: new FormControl({value: ''}),
      Password: new FormControl({value: ''})
    });
  }

  logIn() {
    const f = this.form.getRawValue();
    if (this.form.valid){
      this.billsService.login(f.Email, f.Password);
    }
  }
}
