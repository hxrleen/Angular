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
  }

  onSubmit(): void {
    if (this.formData.id === '') {
      alert('Please select a valid Employee ID.');
      return;
    }
    this.dataService.updateFamilyData(this.formData);
    this.formData = { id: '' };
    alert('Data submitted successfully!');
  }
}
