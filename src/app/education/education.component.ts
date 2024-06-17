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

    this.dataService.educationformData$.subscribe((formData) => {
      this.formData = { ...formData };
    });
  }

  onSubmit(): void {
    if (this.formData.employeeId === '') {
      alert('selct a valid employee ID');
      return;
    }
    if (
      this.dataService.doesEmployeeIdExistInEducation(this.formData.employeeId)
    ) {
      this.dataService.updateEducationData(this.formData);
    } else {
      this.dataService.addEducationData(this.formData);
    }

    this.formData = { employeeId: '' };
    alert('Data submitted successfully!');
  }
}
