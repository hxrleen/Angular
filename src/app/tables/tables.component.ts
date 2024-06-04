import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  personalDataArray: any[] = [];
  familyDataArray: any[] = [];
  educationDataArray: any[] = [];
  experienceDataArray: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.personalData$.subscribe(
      (data) => (this.personalDataArray = data)
    );
    this.dataService.familyData$.subscribe(
      (data) => (this.familyDataArray = data)
    );
    this.dataService.educationData$.subscribe(
      (data) => (this.educationDataArray = data)
    );
    this.dataService.experienceData$.subscribe(
      (data) => (this.experienceDataArray = data)
    );
  }
}
