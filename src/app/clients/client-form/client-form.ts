import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Header } from "../../header/header";
import { HeaderData } from '../../header/header-data.model';
import { ClientService } from '../client-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  imports: [CardModule, ReactiveFormsModule, InputTextModule, TextareaModule, ButtonModule, Header],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm {
  clientService = inject(ClientService);
  router = inject(Router);

  protected readonly headerData = signal<HeaderData>({title: 'Enregistrer un nouveau Clients', icon: 'user'});


  form = new FormGroup({
    firstname: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    lastname: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    phone: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    country: new FormControl('', {validators: [Validators.required], nonNullable: true})
  });

  submit() {
    this.form.markAllAsTouched(); 
    if(this.form.invalid) return; 
    
    const client = this.form.getRawValue();
    this.clientService.createClient(client).subscribe(() => void this.router.navigate(['clients']));
    
  }
}
