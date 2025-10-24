import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface UserEntry {
  name: string;
  mobile: string;
}

@Component({
  selector: 'app-name-mobile-table',
  templateUrl: './name-mobile-table.component.html',
  styleUrls: ['./name-mobile-table.component.css']
})
export class NameMobileTableComponent implements OnInit {
  form: FormGroup;
  userEntries: UserEntry[] = [];
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ]],
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[0-9]{10,15}$/)
      ]]
    });
  }

  get name() {
    return this.form.get('name');
  }

  get mobile() {
    return this.form.get('mobile');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // Add the entry to the table
    const newEntry: UserEntry = {
      name: this.form.value.name,
      mobile: this.form.value.mobile
    };

    this.userEntries.push(newEntry);

    // Reset the form
    this.form.reset();
    this.submitted = false;
  }

  deleteEntry(index: number): void {
    this.userEntries.splice(index, 1);
  }

  clearAll(): void {
    this.userEntries = [];
  }
}
