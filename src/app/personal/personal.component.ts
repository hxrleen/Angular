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

  onSubmit(): void {
    this.dataService.updatePersonalData(this.formData);
    this.formData = {};
    alert('Data submitted successfully!');
  }
}
