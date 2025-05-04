import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // private toastr: ToastrService
    private builder = inject(FormBuilder);
    private service = inject(AuthService);
    private router = inject(Router);
  
    registerform = this.builder.group({
      // id: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.required
      ]],
      email: ['', [Validators.required, Validators.email]]
    });

    proceedregister() {
      if (this.registerform.valid) {
        this.service.RegisterUser(this.registerform.value).subscribe({
          next: () => this.router.navigate(['login']),
          error: (err) => console.error('Registration failed:', err)
        });
      } else {
        console.error('Form is invalid');
      }
    }

    GoToLogin() {
      this.router.navigate(['login']);
    }
}