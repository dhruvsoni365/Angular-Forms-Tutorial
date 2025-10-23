import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]]
    });
  }

  // Getter methods for easy access to form fields
  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log('Form Data:', formData);
      
      // Here you would typically send the data to a service
      alert(`Form submitted successfully!\nName: ${formData.name}\nEmail: ${formData.email}`);
      
      // Reset form after successful submission
      this.resetForm();
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.isSubmitted = false;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper method to check if field has error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? field.hasError(errorType) && (field.dirty || field.touched || this.isSubmitted) : false;
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (!field || !field.errors || (!field.touched && !this.isSubmitted)) {
      return '';
    }

    const errors = field.errors;
    
    if (errors['required']) {
      return `${this.capitalizeFirst(fieldName)} is required`;
    }
    if (errors['email']) {
      return 'Please enter a valid email address';
    }
    if (errors['minlength']) {
      return `${this.capitalizeFirst(fieldName)} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['maxlength']) {
      return `${this.capitalizeFirst(fieldName)} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    }
    if (errors['pattern']) {
      return `${this.capitalizeFirst(fieldName)} can only contain letters and spaces`;
    }

    return 'Invalid input';
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
