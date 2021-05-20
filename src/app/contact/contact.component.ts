import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactRequest } from '../model/contact.model';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formContact: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formContact = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      message: ['',[Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  enviar(): void {
    const name = this.formContact.get('name')?.value;
    const email = this.formContact.get('email')?.value;
    const message = this.formContact.get('message')?.value;

    const data = {
      name:name,
      email: email,
      message: message
    } as ContactRequest;

    console.log(data);
  }

}
