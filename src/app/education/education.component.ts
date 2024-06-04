import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  formData: any = {};

  constructor(private dataService: DataService) {}

  onSubmit(): void {
    this.dataService.updateEducationData(this.formData);
    this.formData = {};
    alert('Data submitted successfully!');
  }
}
