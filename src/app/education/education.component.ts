import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  formData: any = { employeeId: '' };
  personalDataIds: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.personalData$.subscribe((personalData) => {
      this.personalDataIds = personalData.map((data) => data.id);
    });
  }

  onSubmit(): void {
    if (this.formData.employeeId === '') {
      alert('Please select a valid Employee ID.');
      return;
    }
    this.dataService.updateEducationData(this.formData);
    this.formData = { employeeId: '' };
    alert('Data submitted successfully!');
  }
}
