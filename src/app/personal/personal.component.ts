import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent {
  formData: any = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.personalformData$.subscribe((formData) => {
      this.formData = { ...formData };
    });
  }

  onSubmit(): void {
    if (this.isValidFormData(this.formData)) {
      if (this.formData.id) {
        this.dataService.updatePersonalData(this.formData);
      } else {
        this.formData.id = this.generateUniqueId();
        this.dataService.addPersonalData(this.formData);
      }
      this.formData = {};
    } else {
      alert('Please fill out all fields.');
    }
  }

  private isValidFormData(data: any): boolean {
    return data.name && data.dob && data.address && data.designation;
  }

  private generateUniqueId(): string {
    return (
      'BTS_' +
      Date.now().toString(16) +
      Math.floor(Math.random() * 1000).toString(16)
    );
  }
}
