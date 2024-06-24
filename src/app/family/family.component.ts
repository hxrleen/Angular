import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css'],
})
export class FamilyComponent implements OnInit {
  formData: any = { id: '' };
  personalDataIds: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.personalData$.subscribe((personalData) => {
      this.personalDataIds = personalData.map((data) => data.id);
    });

    this.dataService.familyformData$.subscribe((formData) => {
      this.formData = { ...formData };
    });
  }

  onSubmit(): void {
    if (this.formData.id === '') {
      alert('Please select a valid Employee ID.');
      return;
    }
    if (this.isValidFormData(this.formData)) {
      if (
        this.dataService.doesIdExist(
          this.dataService.familyDataSubject,
          this.formData.id
        )
      ) {
        this.dataService.updateFamilyData(this.formData);
      } else {
        this.dataService.addFamilyData(this.formData);
      }
      this.formData = { id: '' };
    } else {
      alert('Please fill out all fields.');
    }
  }

  private isValidFormData(data: any): boolean {
    return (
      data.fathersName &&
      data.fatherDOB &&
      data.motherName &&
      data.motherDOB &&
      data.spouseName &&
      data.spouseDOB
    );
  }
}
