import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css'],
})
export class FamilyComponent {
  formData: any = {};

  constructor(private dataService: DataService) {}

  onSubmit(): void {
    this.dataService.updateFamilyData(this.formData);
    this.formData = {};
    alert('Data submitted successfully!');
  }
}
